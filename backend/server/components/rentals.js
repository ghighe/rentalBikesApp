const express = require("express");
const rentals = express.Router();
const database = require("../database");
const functions = require("../functions");

rentals.get("/getRevenueRentals", (req, res) => {
    let new_date = new Date();
    let current_date = functions.transformDate(new_date);
    let last_month = functions.transformDate(new Date(new_date.getFullYear(), new_date.getMonth() - 1, new_date.getDate()));
    database.query(`SELECT SUM(invoice.net_amount) AS total_net_amount FROM rentals LEFT JOIN invoice ON invoice.id = rentals.invoice_id WHERE rentals.end_date_time <= "${current_date}" AND rentals.start_date_time BETWEEN "${last_month}" AND "${current_date}"`, (err, result, fields) => {
        if (err) {
            res.json({ type: "error", message: err.sqlMessage + ". Query: " + err.sql });
            return;
        }
        if (result.length != 0) {
            res.json({ type: "success", message: { total_net_amount: result[0].total_net_amount } });
        } else {
            res.json({ type: "error", message: `No rentals/invoices!`});
        }
    });
});

module.exports = rentals;