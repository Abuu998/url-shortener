import mongoose from "mongoose";


// Utils
const makeRandId = () => {
    const randId = Math.random().toString(36)
    return randId.slice(2, randId.length - 2)
}


const urlShortenerSchema = new mongoose.Schema({
    original_url: {
        type: String,
        required: true
    },
    short_url: {
        type: String,
        default: makeRandId()
    }
})


export default mongoose.model("ShortUrl", urlShortenerSchema)
