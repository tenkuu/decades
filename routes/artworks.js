const express = require(`express`)
const DB = require(`./src/db`)

const router = express.Router()

//DEBUG API
router.get(`/debug/all`, async (req, res) => {
    const allArtworks = await DB.GetArtworks(DB.access.ALL)
    res.json(allArtworks)
})

router.get(`/debug/:user`, async (req, res) => {
    const allArtworks = await DB.GetArtworks(DB.access.ALL, req.params.user)
    res.json(allArtworks)
})


//Randomly generate artworks for testing
router.post(`/debug/reset/:amount`, async (req, res) => {
    const artworks = await DB.ResetWithRandomArtworks(req.params.amount)
    res.json(artworks)
})

//PRODUCTION API
router.get(`/uploaded`, async (req, res) => {
    const uploadedArtworks = await DB.GetArtworks(DB.access.UPLOADED_ONLY)
    res.json(uploadedArtworks)
})

router.get(`/local`, async (req, res) => {
    const fakeLoggedUser = 'user_name_6'
    const localArtworks = await DB.GetArtworks(DB.access.ALL, fakeLoggedUser)
    res.json(localArtworks)
})

router.post(`/save`, async (req, res) => {
    let updatedArtwork = await DB.UpdateArtwork(req.body)
    res.json(updatedArtwork)
})

router.post(`/upload`, async (req, res) => {
    //same as /save but we need to explicitly mark is as .public = true
    //SAVEs and UPLOADs
    let artworkToUpload = req.body
    artworkToUpload.public = true
    let updatedArtwork = await DB.UpdateArtwork(artworkToUpload)
    res.json(updatedArtwork)
})

module.exports = router