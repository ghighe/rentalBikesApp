const express = require("express");
const bikes = express.Router();
const database = require("../database");
const functions = require("../functions");

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

bikes.get("/addBike", (req, res) => {
  const description = req.query.description;
  const type = req.query.type;
  database.query(
    `INSERT INTO bikes (type, description) VALUES ("${type}", "${description}")`,
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
});

bikes.get("/deleteBike", (req, res) => {
  const bike_id = req.query.bike_id;
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
});

bikes.get("/editBike", (req, res) => {
  const bike_id = req.query.bike_id;
  const type = req.query.type;
  const description = req.query.description;
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
});

bikes.get("/getBikesCount", (req, res) => {
  database.query(
    `Select (select count(bikes.id) from bikes) as bikes_count, (select count(rentals.id) from rentals) as rentals_count`,
    (err, result, fields) => {
      if (err) {
        res.json({
          type: "error",
          message: err.sqlMessage + ". Query: " + err.sql
        });
        return;
      }
      res.status(200).json({
        type: "success",
        message: {
          bikes_count: result[0]["bikes_count"],
          rentals_count: result[0]["rentals_count"]
        }
      });
    }
  );
});

module.exports = bikes;
