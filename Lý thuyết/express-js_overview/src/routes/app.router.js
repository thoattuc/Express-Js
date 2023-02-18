const express = require("express")
const router = express.Router()

router.get("/", function (req, res) {
    res.send("GET");
});

router.post("/", function (req, res) {
    res.send("POST");
});

module.exports = router;