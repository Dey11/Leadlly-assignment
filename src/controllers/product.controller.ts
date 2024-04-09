import { Request, Response } from "express";
import Product from "../models/Product.model";
import { Product as IProduct } from "../ts/db.interface";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const findAllProducts = await Product.find();
    return res.json({ message: "get all products", data: findAllProducts });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "failed to get all products" });
  }
};

export const createNewProduct = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const image = req.body || "";

  try {
    const newProduct: IProduct = {
      name,
      description,
    };

    if (req.body.category) {
      newProduct.category = req.body.category;
    }
    if (req.body.image) {
      newProduct.category = req.body.image;
    }

    const registeredProduct = await Product.create(newProduct);

    return res.json({
      message: "product has been created successfully",
      data: registeredProduct,
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "failed to create a new product" });
  }
};
