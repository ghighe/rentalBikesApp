const express = require('express');
const app = express();
const bikes = require("./server/components/bikes");
require('dotenv').config();
const port = process.env.SERVER_PORT || 4000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/bikes", bikes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});