const express = require(`express`)
const DB = require(`./db`)

const router = express.Router()

router.get(`/api/hello`, (req, res) => {
    res.json(`Hello World from the server!`)
})

//Randomly generate artworks for testing
router.post(`/api/artworks/generate_random/:amount`, async (req, res) => {
    const artworks = await DB.ResetWithRandomArtworks(req.params.amount)
    res.json(artworks)
})

router.get(`/api/artworks`, async (req, res) => {
    const artworks = await DB.GetArtworks()
    res.json(artworks)
})

router.post(`/api/artworks/upload`, async (req, res) => {
    //req.body automatically contains JSON, otherwise fails earlier
    const resultingArtworks = await DB.AddArtwork(req.body)
    res.json(resultingArtworks)
    return
})

module.exports = router