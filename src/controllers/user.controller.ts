import { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.model";
import { User as IUser } from "../ts/db.interface";
import dotenv from "dotenv";
import { IAuthRequest } from "../ts/req.interface";
dotenv.config();

const salt = bcrypt.genSaltSync(10);

export const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser: IUser = {
      email,
      password: hashedPassword,
      name,
    };

    if (req.body.description) {
      newUser.description = req.body.description;
    }

    if (req.body.phoneNumber) {
      newUser.description = req.body.phoneNumber;
    }

    const registeredUser = await User.create(newUser);
    return res.json({
      message: "user has been registered",
      data: registeredUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "failed to register user" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const findUserInDb = await User.findOne({ email });
    if (!findUserInDb) {
      return res.json({ message: "user with that email doesnt exist" });
    }

    const isPassRight = bcrypt.compareSync(password, findUserInDb.password);

    if (!isPassRight) {
      return res.json({ message: "invalid credentials" });
    }
    const jwtSecret = process.env.JWT_SECRET;
    const token = await jwt.sign({ id: findUserInDb._id }, jwtSecret as Secret);
    res.cookie("token", token);
    return res.json({
      message: "user has been logged in",
      data: findUserInDb,
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "user could not be logged in" });
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res.cookie("token", "");
    return res.json({ message: "logged out" });
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "error" });
  }
};

export const editUser = async (req: IAuthRequest, res: Response) => {
  const decodedId = req.decodedId;

  try {
    if (req.body.name) {
      const newName = req.body.name;
      await User.findOneAndUpdate({ _id: decodedId }, { name: newName });
    }
    if (req.body.phoneNumber) {
      const newPhNum = req.body.phoneNumber;
      await User.findOneAndUpdate(
        { _id: decodedId },
        { phoneNumber: newPhNum }
      );
    }
    if (req.body.description) {
      const newDesc = req.body.description;
      await User.findOneAndUpdate({ _id: decodedId }, { description: newDesc });
    }

    return res.json({ message: "successfully updated" });
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "error" });
  }
};
