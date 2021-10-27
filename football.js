const express = require("express")
const router = express.Router()
const fetch = require("node-fetch")
const clubID = 57 //ARSENAL
const API_URL_PL_TABLE = 'http://api.football-data.org/v2/competitions/2021/standings'
const API_NEXT_MATCH = `https://api.football-data.org/v2/teams/${clubID}/matches?status=SCHEDULED`

const settings = { 
    headers: {'X-Auth-Token': `${process.env.FOOTBALL_API_KEY}`}
};

router.get("/table", async (req, res) => {
    try{
        const response = await fetch(API_URL_PL_TABLE, settings);
        const data = await response.json();
        const table = data.standings[0].table
        res.json(table)
    }catch(err){
        res.json(err)
    }
});

router.get("/nextmatch", async (req, res) => {
    try{
        const response = await fetch(API_NEXT_MATCH, settings);
        const data = await response.json();
        const match = data.matches[0];
        res.json(match)
    }catch(err){
        res.json(err)
    }
});

module.exports = router;