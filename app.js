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
    app.listen(process.env.PORT);
  } catch (err) {
    console.log("Failed to connect to Mongo", err);
  }
};

connectDB();
