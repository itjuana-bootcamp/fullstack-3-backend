const express = require("express");
const ProjectController = require("../controllers/project");
const router = express.Router();

router.get("/", ProjectController.getProjects);
router.post("/", ProjectController.createProject);

module.exports = router;
