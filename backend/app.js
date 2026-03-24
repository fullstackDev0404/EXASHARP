const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, ERP project!");
});

module.exports = app;
