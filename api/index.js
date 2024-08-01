import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/db.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
dotenv.config()

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

app.use(express.json())
app.use(cookieParser())
app.use("/images", express.static(path.join(__dirname,"/images")))
app.use(cors({origin: "https://blog-app-mern-frontend.onrender.com", credentials: true}))
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)

const storage = multer.diskStorage({
    destination:(req, file, fn) => {
        fn(null, "images")
    },
    filename: (req, file, fn) => {
            fn(null, req.body.img)
       
    }
})

const upload = multer({storage:storage})
app.post("/api/upload", upload.single("file"), (req, res) => {
    console.log(res.body);
    res.status(200).json({message: "Image has been uploaded"})
})



const PORT = process.env.PORT || 5000



app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on ${PORT}`);
})