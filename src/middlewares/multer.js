import multer from 'multer'
import { extname } from 'node:path'
// import { fileURLToPath } from 'url'
// import { dirname, join } from 'node:path'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

const storage = multer.diskStorage({
  // const uploadPath = join(__dirname, '..', 'public', 'uploads')

  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + extname(file.originalname))
  }
})

const upload = multer({ storage })

export const uploadFields = upload.fields([{ name: 'poster', maxCount: 1 }, { name: 'banner', maxCount: 1 }]) // este se usa para cuando esperamos mas de una imagen en diferentes propiedades

export default upload
