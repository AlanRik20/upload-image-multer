import multer from "multer";
import path from 'node:path';
import crypto from 'node:crypto';

// STORAGE
// se especifica en dónde se almacenará la imagen, en este caso en un archivo local
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, "src/uploads/");
    },
    filename: (_req, file, cb) => {
        const fileName = crypto.randomUUID().toString() + path.extname(file.originalname);
        cb(null, fileName);
    },
});


// LIMITS
const maxMb = 20;
const limits = { fileSize: 1024 * 1024 * maxMb };

// FILTERS
const fileFilter = (req, file, cb) => {

    // formatos de archivo a utilizar: jpeg, jpg, png, gif, webp

    const fileTypes = /jpg|png/;

    const allowExtname = fileTypes.test(path.extname(file.originalname));

    if (!allowExtname) {
        return cb(new Error("solo se permiten imagenes de extensión jpg o pngs"));
    }

    return cb(null, true)

}

export const upload = multer({
    storage,
    fileFilter,
    limits,

})