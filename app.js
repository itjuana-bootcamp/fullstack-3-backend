const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const ProjectRoutes = require("./src/routes/projects");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3001;

app.use("/projects", ProjectRoutes);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
  } catch (err) {
    console.log("Failed to connect to Mongo", err);
  }
};

const server = app.listen(port, () => {
  console.log(`Server is running in ${port}`);
  connectDB();
});

module.exports = { app, server };
