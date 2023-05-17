const express = require("express");
const ProjectController = require("../controllers/project");
const router = express.Router();

router.get("/", ProjectController.getProjects);

module.exports = router;
