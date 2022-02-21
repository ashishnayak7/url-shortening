import express  from 'express';
import { dbStore } from '../app';
import Url from '../models/urlModel';

const router = express.Router()
let urlObj = new Url(dbStore);

router.get('/:code', async (req, res) => {
    try {
        const url = await urlObj.findByCode(req.params.code);
        if (url) {
            return res.redirect(url);
        } else {
            return res.status(404).json('No URL Found');
        }

    }
    // exception handler
    catch (err) {
        console.error(err)
        res.status(500).json('Server Error')
    }
})

export { router };