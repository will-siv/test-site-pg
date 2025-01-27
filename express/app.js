const express = require("express");
// const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 80;

app.use(express.static("front"));

app.use(express.json());

app.get("/api/music", (req, res) => {
    const url = "https://api.spotify.com/v1/me/player";
    console.log(process.env);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
});
