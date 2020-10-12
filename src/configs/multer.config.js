//multer configs
import multer from "multer";

/**
 * multer config for upload single file
 */
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})

export default multer({storage: storage});
