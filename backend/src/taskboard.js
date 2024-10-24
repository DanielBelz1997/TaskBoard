require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

const PORT = process.env.PORT || 3000;

morgan(':method :url :status :res[content-length] - :response-time ms')

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
