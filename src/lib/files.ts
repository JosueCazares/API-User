import multer from "multer";
import path from "path";

export const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        const newName = file.fieldname + '-' + Date.now() + ext
        cb(null, newName)
    }
})

export const upload = multer({ storage: storage })