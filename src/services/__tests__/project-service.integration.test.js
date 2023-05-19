const request = require("supertest");
const app = require("../../../app").app;
const Project = require("../../models/project");

const mongoose = require("mongoose");

beforeAll(async () => {
  await mongoose.connect(process.env.DATABASE_URL);
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("GET /projects", () => {
  const projectOne = {
    name: "Project one",
    projectLink: "projectone.com",
    description: "This is a first project",
    overview: "a brief overview of the project",
    imageUrl: "projectone.com/image.png",
    tools: ["HTML", "CSS", "Java"],
  };

  const projectTwo = {
    name: "Project two",
    projectLink: "projecttwo.com",
    description: "This is the second project",
    overview: "a brief overview of the project",
    imageUrl: "projecttwo.com/image.png",
    tools: ["HTML", "Python"],
  };

  it("should return all projects in database", async () => {
    await Project.deleteMany();
    await Project.create(projectOne);
    await Project.create(projectTwo);

    const response = await request(app).get("/projects");
    expect(response.status).toBe(200);

    const projects = response.body.projects;

    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toEqual(2);
    expect(projects).toEqual(
      expect.arrayContaining([expect.objectContaining(projectOne)]),
      expect.arrayContaining([expect.objectContaining(projectTwo)])
    );
  });
});
