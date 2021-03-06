const express = require("express");
const configRoutes = require('./routes');
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

configRoutes(app);

app.listen(3001, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3001');
  });