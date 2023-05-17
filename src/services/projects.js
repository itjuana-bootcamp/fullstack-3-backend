const Project = require("../models/project");

exports.getProjects = async () => {
  let projects = await Project.find().exec();
  return projects;
};
