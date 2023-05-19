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

describe("GET /projects", () => {
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

describe("POST /projects", () => {
  it("should create a new projects and return a created status code", async () => {
    const response = await request(app).post("/projects").send(projectOne);

    expect(response.statusCode).toBe(201);
    expect(response.body.projectSaved).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        name: projectOne.name,
        projectLink: projectOne.projectLink,
        description: projectOne.description,
        overview: projectOne.overview,
        imageUrl: projectOne.imageUrl,
        tools: projectOne.tools,
      })
    );

    await Project.findByIdAndDelete(response.body.projectSaved._id);
  });

  it("should return a 400 code and an error message when required fields are missing", async () => {
    const { overview, ...incompleteProject } = projectOne;

    const response = await request(app)
      .post("/projects")
      .send(incompleteProject);

    expect(response.statusCode).toBe(400);
    expect(response.error.text).toContain("Was not able to create the project");
  });
});
