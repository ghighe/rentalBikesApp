const express = require('express');
const app = express();
const bikes = require("./server/components/bikes");
const bike_types = require("./server/components/bike_types");
require('dotenv').config();
const port = process.env.SERVER_PORT || 4000;

app.use("/bikes", bikes);
app.use("/bike_types", bike_types);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});