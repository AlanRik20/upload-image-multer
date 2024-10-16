import { Router } from "express";
import { uploadImage } from "../middlewares/upload.middleware.js";
import { createProduct,listProducts } from "../controllers/product.controller.js";

const router = Router()

router.post("/", uploadImage,createProduct)
router.get("/", listProducts);

export {router}