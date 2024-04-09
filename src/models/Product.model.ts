import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: false,
    enum: ["category1", "category2"],
    default: "category1",
  },
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;
