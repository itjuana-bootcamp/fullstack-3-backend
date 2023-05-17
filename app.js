const express = require("express");
const mongoose = require("mongoose");
const ProjectRoutes = require("./src/routes/projects");
const app = express();

app.use(express.json());
app.use("/projects", ProjectRoutes);

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://yaelaguilar:86QhZOp8as2VFAWd@cluster0.xn9rn6h.mongodb.net/?retryWrites=true&w=majority"
    );
    app.listen(3000);
  } catch (err) {
    console.log("Failed to connect to Mongo", err);
  }
};

connectDB();
