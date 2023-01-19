const express = require("express");
const bikes = express.Router();
const database = require("../database");

bikes.get("/getBikes", (req, res) => {
    database.query("SELECT * FROM bikes LEFT JOIN bike_types ON bike_types.id=bikes.type", (err, result, fiels) => {
        if (err) {
            throw err;
        } else {
            if (result.length != 0) {
                res.json({ bikes: result });
            }
        }
    });
});

module.exports = bikes;