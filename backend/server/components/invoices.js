const express = require("express");
const invoices = express.Router();
const database = require("../database");

invoices.get("/getInvoices", (req, res) => {
    database.query("SELECT * FROM invoices", (err, result, fields) => {
        if (err) {
            res.json({ type: "error", message: err });
            return;
        }
        if (result.length != 0) {
            res.json({ message: result });
        } else {
            res.json({ type: "error", message: `No invoices!`});
        }
    });
});

module.exports = invoices;