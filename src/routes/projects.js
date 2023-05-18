const express = require("express");
const ProjectController = require("../controllers/project");
const router = express.Router();

router.get("/", ProjectController.getProjects);
router.get("/:id", ProjectController.getProjectById);
router.post("/", ProjectController.createProject);
router.put("/:id", ProjectController.updateProject);

module.exports = router;
