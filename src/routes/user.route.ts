import express, { Request, Response } from "express";
import { Router } from "express";
import {
  editUser,
  login,
  logout,
  register,
} from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { IAuthRequest } from "../ts/req.interface";

export const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
//@ts-ignore
router.patch("/edit", authMiddleware, editUser);
