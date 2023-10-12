import mongoose from "mongoose";
import { nanoid } from "nanoid";


const urlShortenerSchema = new mongoose.Schema({
    original_url: {
        type: String,
        required: true
    },
    short_url: {
        type: String,
        default: nanoid(5)
    }
})


export default mongoose.model("ShortUrl", urlShortenerSchema)
