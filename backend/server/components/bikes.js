const express = require("express");
const bikes = express.Router();
const database = require("../database");

bikes.get("/getBikes", (req, res) => {
    database.query("SELECT description, extra_information, price_per_minute, register_date, type, bikes.id as bike_id, bike_types.id as type_id FROM bikes LEFT JOIN bike_types ON bike_types.id=bikes.type", (err, result, fields) => {
        if (err) throw err;
        if (result.length != 0) {
            for (let i = 0; i < result.length; i++) {
                let register_date = new Date(result[i]['register_date']);
                let year = register_date.getFullYear();
                let month = register_date.getMonth() + 1;
                let dt = register_date.getDate();
                let hr = register_date.getHours();
                let mn = register_date.getMinutes();
                let sc = register_date.getSeconds();
                if (dt < 10) {
                    dt = '0' + dt;
                }
                if (month < 10) {
                    month = '0' + month;
                }
                if (hr < 10) {
                    hr = '0' + hr;
                }
                if (mn < 10) {
                    mn = '0' + mn;
                }
                if (sc < 10) {
                    sc = '0' + sc;
                }
                result[i]['register_date'] = year + '-' + month + '-' + dt + " " + hr + ":" + mn + ":" + sc;
            }
            res.json({ message: result });
        } else {
            res.json({ message: `No bikes!`});
        }
    });
});

bikes.get("/getBike", (req, res) => {
    const bike_id = req.query.bike_id;
    database.query(`SELECT description, extra_information, price_per_minute, register_date, type, bikes.id as bike_id, bike_types.id as type_id FROM bikes LEFT JOIN bike_types ON bike_types.id=bikes.type WHERE bikes.id="${bike_id}"`, (err, result, fields) => {
        if (err) throw err;
        if (result.length != 0) {
            let register_date = new Date(result[0]['register_date']);
            let year = register_date.getFullYear();
            let month = register_date.getMonth() + 1;
            let dt = register_date.getDate();
            let hr = register_date.getHours();
            let mn = register_date.getMinutes();
            let sc = register_date.getSeconds();
            if (dt < 10) {
                dt = '0' + dt;
            }
            if (month < 10) {
                month = '0' + month;
            }
            if (hr < 10) {
                hr = '0' + hr;
            }
            if (mn < 10) {
                mn = '0' + mn;
            }
            if (sc < 10) {
                sc = '0' + sc;
            }
            result[0]['register_date'] = year + '-' + month + '-' + dt + " " + hr + ":" + mn + ":" + sc;
            res.json({ message: result });
        } else {
            res.json({ message: `No bike with ID ${bike_id}!`});
        }
    });
});

bikes.get("/addBike", (req, res) => {
    const extra_information = req.query.extra_information;
    const type = req.query.type;
    database.query(`INSERT INTO bikes (type, extra_information) VALUES ("${type}", "${extra_information}")`, (err, result, fields) => {
        if (err) throw err;
        let new_bike_id = result.insertId;
        res.json({ message: `Success! A new bike with ID ${new_bike_id} has been added!` });
    });
});

bikes.get("/deleteBike", (req, res) => {
    const bike_id = req.query.bike_id;
    database.query(`SELECT id FROM bikes WHERE id="${bike_id}"`, (err, result, fields) => {
        if (err) throw err;
        if (result.length) {
            database.query(`DELETE FROM bikes WHERE id="${bike_id}"`, (err, result, fields) => {
                if (err) throw err;
                database.query(`DELETE FROM rentals WHERE bike_id="${bike_id}"`, (err, result, fields) => {
                    if (err) throw err;
                    res.json({ message: `Bike with ID ${bike_id} has been deleted!` });
                });
            });
        } else {
            res.json({ message: `The bike with ID ${bike_id} does not exist in database!` });
        }
    });
});

bikes.get("/editBike", (req, res) => {
    const bike_id = req.query.bike_id;
    const type = req.query.type;
    const extra_information = req.query.extra_information;
    database.query(`SELECT id FROM bikes WHERE id="${bike_id}"`, (err, result, fields) => {
        if (err) throw err;
        if (result.length) {
            database.query(`UPDATE bikes SET type="${type}", extra_information="${extra_information}" WHERE id="${bike_id}"`, (err, result, fields) => {
                if (err) throw err;
                res.json({ message: `The dates have been changed for bike ID ${bike_id}!` });
            });
        } else {
            res.json({ message: `The bike with ID ${bike_id} does not exist in database!` });
        }
    });
});

bikes.get("/getBikesCount", (req, res) => {
    database.query(`SELECT COUNT(rentals.id) AS rentals_count, COUNT(bikes.id) AS bikes_count FROM bikes LEFT JOIN rentals ON rentals.bike_id = bikes.id`, (err, result, fields) => {
        if (err) throw err;
        res.json({ message: { bikes_count: result[0]['bikes_count'], rentals_count: result[0]['rentals_count'] } });
    });
});

module.exports = bikes;