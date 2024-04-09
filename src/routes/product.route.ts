import express, { Router } from "express";
import {
  createNewProduct,
  getAllProducts,
} from "../controllers/product.controller";

export const router = Router();

router.get("/", (req, res) => {
  getAllProducts(req, res);
});
router.post("/create", (req, res) => {
  createNewProduct(req, res);
});
