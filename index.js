require("dotenv").config();
const express = require("express");
const cors = require("cors")
const app = express()
const port = 3000;

const football = require("./football.js")
const youtube = require("./youtube.js")

app.use(express.json());

//Enable Cors
app.use(cors());

//Set static folder
app.use(express.static('public'))

//Routes
app.use("/football", football);
app.use("/youtube", youtube);



app.listen(port, () => console.log(`App listening on port ${port}`));

