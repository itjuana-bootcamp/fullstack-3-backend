const Project = require("../models/project");

exports.getProjects = async () => {
  let projects = await Project.find().exec();
  return projects;
};

exports.createProject = async (requestBody) => {
  const project = new Project({
    name: requestBody.name,
    projectLink: requestBody.projectLink,
    description: requestBody.description,
    overview: requestBody.overview,
    imageUrl: requestBody.imageUrl,
    tools: requestBody.tools,
  });
  return await project.save();
};
