import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet, { crossOriginEmbedderPolicy } from 'helmet'
import connectDB from './config/connectDB.js'


const app = express()
app.use(cors({
    creadentials:true,
    origin: process.env.FRONTEND_URL,
}))

app.use(express.json())
app.use(cookieParser())
app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy : false,
}
))

const PORT = 8080 || process.env.PORT


//Database Connection Establishment 
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`)
    })
})


app.get("/",(request,response)=>{
    ///server to client side 
    response.json({
        message: "Kudos Amigo, Server is Running",
    })
})