const express = require('express');
const app = express();
const bikes = require("./server/components/bikes");
const bike_types = require("./server/components/bike_types");
const invoices = require("./server/components/invoices");
const bodyParser = require('body-parser');
require('dotenv').config();
const port = process.env.SERVER_PORT || 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/bikes", bikes);
app.use("/bike_types", bike_types);
app.use("/invoices", invoices);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});