const express = require("express");
const bike_types = express.Router();
const database = require("../database");
const hash = process.env.HASH;

bike_types.get("/getBikeTypes", (req, res) => {
  database.query("SELECT * FROM bike_types", (err, result, fields) => {
    if (err) {
      res.json({
        type: "error",
        message: err.sqlMessage + ". Query: " + err.sql
      });
      return;
    }
    if (result.length != 0) {
      res.json({ type: "success", message: result });
    } else {
      res.json({ type: "error", message: [] });
    }
  });
});

bike_types.post("/getBikeType", (req, res) => {
  const id = req.body.id;
  database.query(
    `SELECT * FROM bike_types WHERE id="${id}"`,
    (err, result, fields) => {
      if (err) {
        res.json({
          type: "error",
          message: err.sqlMessage + ". Query: " + err.sql
        });
        return;
      }
      if (result.length != 0) {
        res.json({ type: "success", message: result });
      } else {
        res.json({ type: "error", message: `No bike type with ID ${id}!` });
      }
    }
  );
});

bike_types.post("/addBikeType", (req, res) => {
  const id = req.body.id;
  const description = req.body.description;
  const price_per_minute = req.body.price_per_minute;
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
          `SELECT id FROM bike_types WHERE id="${id}"`,
          (err, result, fields) => {
            if (err) {
              res.json({
                type: "error",
                message: err.sqlMessage + ". Query: " + err.sql
              });
              return;
            }
            if (!result.length) {
              database.query(
                `INSERT INTO bike_types (id, description, price_per_minute) VALUES ("${id}", "${description}", "${price_per_minute}")`,
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
                    message: `Success! A new bike type with ID ${id} has been added!`
                  });
                }
              );
            } else {
              database.query(
                `SELECT id FROM bike_types ORDER BY id DESC LIMIT 1`,
                (err, result, fields) => {
                  if (err) {
                    res.json({
                      type: "error",
                      message: err.sqlMessage + ". Query: " + err.sql
                    });
                    return;
                  }
                  let suggest_text = "";
                  if (result.length != 0) {
                    let last_id = result[0]["id"];
                    let new_id = last_id + 1;
                    suggest_text = ` We suggest you enter the ID ${new_id}!`;
                  }
                  res.json({
                    type: "error",
                    message: `There is already a bike type with ID ${id}!${suggest_text}`
                  });
                }
              );
            }
          }
        );
      }
    }
  );
});

bike_types.post("/editBikeType", (req, res) => {
  const id = req.body.id;
  const description = req.body.description;
  const price_per_minute = req.body.price_per_minute;
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
          `SELECT id FROM bike_types WHERE id="${id}"`,
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
                `UPDATE bike_types SET description="${description}", price_per_minute="${price_per_minute}" WHERE id="${id}"`,
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
                    message: `The dates have been changed for bike type ID ${id}!`
                  });
                }
              );
            } else {
              res.json({
                type: "error",
                message: `The bike type with ID ${id} does not exist in database!`
              });
            }
          }
        );
      }
    }
  );
});

bike_types.post("/deleteBikeType", (req, res) => {
  const id = req.body.id;
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
          `SELECT id FROM bike_types WHERE id="${id}"`,
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
                `DELETE FROM bike_types WHERE id="${id}"`,
                (err, result, fields) => {
                  if (err) {
                    res.json({
                      type: "error",
                      message: err.sqlMessage + ". Query: " + err.sql
                    });
                    return;
                  }
                  database.query(
                    `DELETE FROM bikes WHERE type="${id}"`,
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
                        message: `Bike Type with ID ${id} has been deleted!`
                      });
                    }
                  );
                }
              );
            } else {
              res.json({
                type: "error",
                message: `The bike type with ID ${id} does not exist in database!`
              });
            }
          }
        );
      }
    }
  );
});

module.exports = bike_types;
