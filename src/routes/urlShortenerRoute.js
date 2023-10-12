import express from "express";
import UrlModel from "../models/shortenerModel.js"
import dns from "dns"

const router = express.Router()


router.post("/api/shorturl", (req, res) => {
    const { url } = req.body

    if(!url) return res.json({
        error: "Enter url"
    })

    const urlObj = new URL(url)

    dns.lookup(urlObj.hostname, (err) => {
        if(err) {
            res.json({
                error: "invalid url"
            })
        }
        else {
            const short = new UrlModel({
                original_url: url
            })

            short.save()
                .then(shortened => {
                    res.json(shortened)
                })
                .catch(err => {
                    res.sendStatus(500)
                })
        }
    })
})



router.get("/api/shorturl/:short", (req, res) => {
    const { short } = req.params

    UrlModel.findOne({
        short_url: short
    })
    .then(data => {
        res.redirect(data.original_url)
    })
    .catch(err => res.sendStatus(404))
})


router.delete("/api/shorturl/:short", (req, res) => {
    const { short } = req.params

    UrlModel.findOneAndRemove({
        short_url: short
    })
    .then(data => {
        res.json(data)
    })
    .catch(err => res.sendStatus(404))
})


export default router