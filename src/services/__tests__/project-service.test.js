const Chance = require("chance");

const ProjectService = require("../projects");

const Project = require("../../models/project");

const chance = new Chance();

jest.mock("../../models/project");

describe("when calling the project service method", () => {
  let id, projectData, updatedProject;

  beforeEach(() => {
    id = chance.guid();
    projectData = {
      name: chance.name(),
      describe: chance.string(),
    };
    updatedProject = projectData;

    Project.findByIdAndUpdate = jest.fn().mockReturnThis();
    Project.lean = jest.fn().mockReturnThis();
    Project.exec = jest.fn().mockResolvedValue(updatedProject);
  });

  it("should call Project.findByIdAndUpdate with the id, project data and return document new property", async () => {
    await ProjectService.updateProject(id, projectData);

    expect(Project.findByIdAndUpdate).toBeCalledWith(id, projectData, {
      new: true,
    });
  });

  it("should call Project.lean", async () => {
    await ProjectService.updateProject(id, projectData);

    expect(Project.lean).toBeCalled();
  });

  it("should call Project.exec", async () => {
    await ProjectService.updateProject(id, projectData);

    expect(Project.exec).toBeCalled();
  });

  it("should return the updated project data", async () => {
    const result = await ProjectService.updateProject(id, projectData);

    expect(result).toEqual(updatedProject);
  });
});
