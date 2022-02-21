import express from 'express';
import { validUrl } from 'valid-url';
import { shortid } from 'shortid';
import Url from '../models/urlModel';
import { URLObj } from '../interfaces/urlInterface';
import { dbStore } from '../app'

const router = express.Router()

// @route    POST /api/url/shorten
// @description     Create short URL

const baseUrl = 'http:localhost:5000'
let urlObj = new Url(dbStore);

router.post('/shorten', async (req, res) => {
    const {
        longUrl
    } = req.body

    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base URL')
    }

    const urlCode = shortid.generate()

    if (validUrl.isUri(longUrl)) {
        try {
            let url = await urlObj.findUrl(longUrl)
            if (url) {
                res.json(url)
            } else {
                const shortUrl = baseUrl + '/' + urlCode
                // creating Url Obj model and saving to the DB
                const url: URLObj = {
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                };
                await urlObj.saveUrl(url)
                res.json(url)
            }
        }
        // exception handler
        catch (err) {
            console.log(err)
            res.status(500).json('Server Error')
        }
    } else {
        res.status(401).json('Invalid longUrl')
    }
})

export { router };