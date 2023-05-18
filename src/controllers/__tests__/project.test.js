const Chance = require("chance");

//What we want to test
const ProjectController = require("../project");

//Dependencies
const ProjectService = require("../../services/projects");

const chance = new Chance();

//Mock dependencies
jest.mock("../../services/projects");

describe("when calling update project controller", () => {
  let id, projectData, updatedProject, req, res;

  beforeEach(() => {
    id = chance.guid();
    projectData = {
      name: chance.name(),
      description: chance.string(),
    };
    updatedProject = projectData;
    req = {
      params: { id },
      body: projectData,
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    global.console = { log: jest.fn(), error: jest.fn() };

    ProjectService.updateProject = jest.fn().mockResolvedValue(updatedProject);
  });

  it("should call ProjectService.updateProject with the id and projectData", async () => {
    //ACT
    await ProjectController.updateProject(req, res);

    //ASSERT
    expect(ProjectService.updateProject).toHaveBeenCalledWith(id, projectData);
  });

  it("should call res.status with a 200 status code", async () => {
    await ProjectController.updateProject(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should call res.json with the updated project data", async () => {
    await ProjectController.updateProject(req, res);

    expect(res.json).toHaveBeenCalledWith(updatedProject);
  });

  it("should call res.status with 500 when the ProjectService.updateProject service fails", async () => {
    //ARRANGE
    const error = new Error();
    ProjectService.updateProject = jest.fn().mockRejectedValue(error);

    //ACT
    await ProjectController.updateProject(req, res);

    //ASSERT
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
