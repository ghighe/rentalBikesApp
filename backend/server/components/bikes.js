const express = require("express");
const bikes = express.Router();
const database = require("../database");

bikes.get("/getBikes", (req, res) => {
    database.query("SELECT * FROM bikes LEFT JOIN bike_types ON bike_types.id=bikes.type", (err, result, fields) => {
        if (err) throw err;
        if (result.length != 0) {
            res.json({ bikes: result });
        } else {
            res.json({ message: `No bikes!`});
        }
    });
});

bikes.get("/getBike", (req, res) => {
    const extra_information = req.query.extra_information;
    database.query(`SELECT * FROM bikes LEFT JOIN bike_types ON bike_types.id=bikes.type WHERE extra_information LIKE "%${extra_information}%"`, (err, result, fields) => {
        if (err) throw err;
        if (result.length != 0) {
            res.json({ bikes: result });
        } else {
            res.json({ message: `No bikes with this name! (${extra_information})`});
        }
    });
});

bikes.get("/getBikesCount", (req, res) => {
    database.query(`SELECT COUNT(rentals.id) AS rentals_count, COUNT(bikes.id) AS bikes_count FROM bikes LEFT JOIN rentals ON rentals.bike_id = bikes.id`, (err, result, fields) => {
        if (err) throw err;
        res.json({ total_bikes: result[1], total_rentals: result[0] });
    });
});

module.exports = bikes;