import express from "express";
import Art from "../models/art.js";

const router = express.Router();

router.get('/arts', async (req, res) => {
    try {
        await Art.find()
            .then(art => {
                if (art.length === 0) {
                    res.json({"Message": "No art in database"})
                } else {
                    res.json(art)
                }
            })
    } catch (err) {
        res.status(500).send(err)
    }
})

router.get('/art/:id', async (req, res) => {
    try {
        await Art.findById(req.params.id)
            .then(art => {
                if (art == null) {
                    res.json({"Message": "No art with that id"})
                } else {
                    res.json(art)
                }
            })
    } catch (err) {
        res.status(500).send('Internal Server Error')
    }
})

router.post('/art', async (req, res) => {
    try {
        const {artName, serial, src, alt, bids} = req.body
        if (src == null || src === "") {
            res.json({"Message": "Please enter the source of the art"})
        }
        else {
            const art = new Art({
                artName,
                serial,
                src,
                alt,
                bids
            })
            art.save()
                .then(() => res.json(art))
                .catch((err) => res.status(400).json("Error: " + err));
        }
    } catch (err) {
        res.status(500).send('Internal Server Error')
    }
})

router.put('/art/:id', async (req, res) => {
    try {
            if (req.body.user == null || req.body.user === "" || req.body.user == null || req.body.bid === "") {
                res.json({"Message": "Please enter both fields"})
            }
            Art.findById(req.params.id)
            .then((art) => {
                if (art == null) { res.json({"Message": "No Art with that ID"}) }
                else {
                    art.bids.push({
                        user: req.body.user,
                        bid: req.body.bid
                    })
                    art.save()
                        .then(() => res.json("Bid updated!"))
                        .catch((err) => res.status(400).json("Error: " + err));
                }
                    
                
            })
        
    } catch (err) {
        res.json(err)
    }
})

export default router;