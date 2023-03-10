const express = require("express");
const invoices = express.Router();
const database = require("../database");

invoices.get("/getInvoices", (req, res) => {
    database.query("SELECT * FROM invoice", (err, result, fields) => {
        if (err) {
            res.json({ type: "error", message: err.sqlMessage + ". Query: " + err.sql });
            return;
        }
        if (result.length != 0) {
            res.json({ type: "success", message: result });
        } else {
            res.json({ type: "error", message: `No invoices!`});
        }
    });
});

module.exports = invoices;