const express = require("express")
const router = express.Router()
const fetch = require("node-fetch")
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
//ARSENAL CHANNEL LATEST VIDEO
const searchVideoUrl=`https://www.googleapis.com/youtube/v3/search?part=snippet&key=${YOUTUBE_API_KEY}&channelId=UCpryVRk_VDudG8SHXgWcG0w&type=video&order=date`

router.get("/video", async (req, res) => {
    try{
        const response = await fetch(searchVideoUrl);
        const data = await response.json();
        const videoId = data.items[0].id.videoId
        res.json(videoId)
    }catch(err){
        res.json(err)
    }
});

module.exports = router;