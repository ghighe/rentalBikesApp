const express = require("express");
const bikes = express.Router();
const database = require("../database");
const functions = require("../functions");
const hash = process.env.HASH;

bikes.get("/getBikes", (req, res) => {
  database.query(
    "SELECT description, price_per_minute, register_date, type, bikes.id as bike_id, bike_types.id as type_id FROM bikes LEFT JOIN bike_types ON bike_types.id=bikes.type",
    (err, result, fields) => {
      if (err) {
        res.json({
          type: "error",
          message: err.sqlMessage + ". Query: " + err.sql
        });
        return;
      }
      if (result.length != 0) {
        for (let i = 0; i < result.length; i++) {
          result[i]["register_date"] = functions.transformDate(
            result[i]["register_date"]
          );
        }
        res.json({ type: "success", message: result });
      } else {
        res.json({ type: "error", message: `No bikes!` });
      }
    }
  );
});

bikes.get("/getBike", (req, res) => {
  const bike_id = req.query.bike_id;
  database.query(
    `SELECT description, price_per_mainute, register_date, type, bikes.id as bike_id, bike_types.id as type_id FROM bikes LEFT JOIN bike_types ON bike_types.id=bikes.type WHERE bikes.id="${bike_id}"`,
    (err, result, fields) => {
      if (err) {
        res.json({
          type: "error",
          message: err.sqlMessage + ". Query: " + err.sql
        });
        return;
      }
      if (result.length != 0) {
        result[0]["register_date"] = functions.transformDate(
          result[0]["register_date"]
        );
        res.json({ type: "success", message: result });
      } else {
        res.json({ type: "error", message: `No bike with ID ${bike_id}!` });
      }
    }
  );
});

bikes.post("/addBike", (req, res) => {
  const register_date = req.body.register_date;
  const type = req.body.type;

  database.query(
    `SELECT value FROM settings WHERE key_name='hash'`,
    (err, result, fields) => {
      if (err) {
        res.json({
          type: "error",
          message: err.sqlMessage + ". Query: " + err.sql
        });
        return;
      }
      if (result[0]["value"] !== hash) {
        res.json({
          type: "error",
          message:
            "Security Alert: Your hash does not match the one in the database!"
        });
        return;
      } else {
        database.query(
          `INSERT INTO bikes (type, register_date) VALUES ("${type}","${register_date}")`,
          (err, result, fields) => {
            if (err) {
              res.json({
                type: "error",
                message: err.sqlMessage + ". Query: " + err.sql
              });
              return;
            }
            let new_bike_id = result.insertId;
            res.json({
              type: "success",
              message: `Success! A new bike with ID ${new_bike_id} has been added!`
            });
          }
        );
      }
    }
  );
});

bikes.get("/deleteBike", (req, res) => {
  const bike_id = req.query.bike_id;
  database.query(
    `SELECT value FROM settings WHERE key_name='hash'`,
    (err, result, fields) => {
      if (err) {
        res.json({
          type: "error",
          message: err.sqlMessage + ". Query: " + err.sql
        });
        return;
      }
      if (result[0]["value"] !== hash) {
        res.json({
          type: "error",
          message:
            "Security Alert: Your hash does not match the one in the database!"
        });
        return;
      } else {
        database.query(
          `SELECT id FROM bikes WHERE id="${bike_id}"`,
          (err, result, fields) => {
            if (err) {
              res.json({
                type: "error",
                message: err.sqlMessage + ". Query: " + err.sql
              });
              return;
            }
            if (result.length) {
              database.query(
                `DELETE FROM bikes WHERE id="${bike_id}"`,
                (err, result, fields) => {
                  if (err) {
                    res.json({
                      type: "error",
                      message: err.sqlMessage + ". Query: " + err.sql
                    });
                    return;
                  }
                  database.query(
                    `DELETE FROM rentals WHERE bike_id="${bike_id}"`,
                    (err, result, fields) => {
                      if (err) {
                        res.json({
                          type: "error",
                          message: err.sqlMessage + ". Query: " + err.sql
                        });
                        return;
                      }
                      res.json({
                        type: "success",
                        message: `Bike with ID ${bike_id} has been deleted!`
                      });
                    }
                  );
                }
              );
            } else {
              res.json({
                type: "error",
                message: `The bike with ID ${bike_id} does not exist in database!`
              });
            }
          }
        );
      }
    }
  );
});

bikes.get("/editBike", (req, res) => {
  const bike_id = req.query.bike_id;
  const type = req.query.type;
  const description = req.query.description;
  database.query(
    `SELECT value FROM settings WHERE key_name='hash'`,
    (err, result, fields) => {
      if (err) {
        res.json({
          type: "error",
          message: err.sqlMessage + ". Query: " + err.sql
        });
        return;
      }
      if (result[0]["value"] !== hash) {
        res.json({
          type: "error",
          message:
            "Security Alert: Your hash does not match the one in the database!"
        });
        return;
      } else {
        database.query(
          `SELECT id FROM bikes WHERE id="${bike_id}"`,
          (err, result, fields) => {
            if (err) {
              res.json({
                type: "error",
                message: err.sqlMessage + ". Query: " + err.sql
              });
              return;
            }
            if (result.length) {
              database.query(
                `UPDATE bikes SET type="${type}", description="${description}" WHERE id="${bike_id}"`,
                (err, result, fields) => {
                  if (err) {
                    res.json({
                      type: "error",
                      message: err.sqlMessage + ". Query: " + err.sql
                    });
                    return;
                  }
                  res.json({
                    type: "success",
                    message: `The dates have been changed for bike ID ${bike_id}!`
                  });
                }
              );
            } else {
              res.json({
                type: "error",
                message: `The bike with ID ${bike_id} does not exist in database!`
              });
            }
          }
        );
      }
    }
  );
});

module.exports = bikes;
