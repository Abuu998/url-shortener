import mongoose from "mongoose";
import { config } from "dotenv";
import express from "express";
import bodyParser from "body-parser"
import cors from "cors"
import router from "./routes/urlShortenerRoute.js";

config()

const PORT = process.env.PORT || 3000
const DB_URI = process.env.DB_URI


// Connect to mongo with mongoose
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


const app = express()


app.use(bodyParser.json())
app.use(cors())

// Use the router we built
app.use(router)



app.listen(PORT, () => {
    console.log(`Server running at: ${PORT}`)
})