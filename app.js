const express = require("express");
const mongoose = require("mongoose");
const ProjectRoutes = require("./src/routes/projects");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use("/projects", ProjectRoutes);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
  } catch (err) {
    console.log("Failed to connect to Mongo", err);
  }
};

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running in ${process.env.PORT}`);
  connectDB();
});

module.exports = { app, server };
