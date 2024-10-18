import { products } from "../bd/bd.js";

export const createProduct = (req, res) => {
    try {
        const { name, description, price } = req.body;

        // Verificar que todos los campos estén presentes
        if (!name || !description || !price || !req.file) {
            return res.status(400).json({
                error: true,
                message: "Todos los campos son obligatorios y se requiere una imagen."
            });
        }
        // crear una constante con el producto
        const newProduct = {
            id: products.length + 1,
            name,
            description,
            price: parseFloat(price),
            imageURL: "http://localhost:3000/uploads/"+req.body.image,
        };

        // Agregar el producto al array de productos
        products.push(newProduct);


        //respuesta al programa
        res.status(201).json({
            error: false,
            message: "Producto creado exitosamente.",
            product: newProduct,
        });
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({
            error: true,
            message: "Error interno del servidor al crear el producto."
        });
    }
};

export const listProducts = (req, res) => {
    try {
        res.status(200).json({
            products
        });
    } catch (error) {
        console.error('Error al listar productos:', error);
        res.status(500).json({
            error: true,
            message: "Error interno del servidor al listar productos."
        });
    }
};