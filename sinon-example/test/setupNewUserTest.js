const setupNewUser = require("../setupNewUser");
const Database = require("../Database");
const sinon = require("sinon");

describe("testing setupNewUser", function () {
  it("should call save once", function () {
    var save = sinon.spy(Database, "save");
    setupNewUser({ name: "test" }, function () {});
    save.restore();
    sinon.assert.calledOnce(save);
  });

  it("should pass object with correct values to save", function () {
    var save = sinon.spy(Database, "save");
    var info = { name: "John Doe" };
    var expectedUser = {
      name: info.name,
      nameLowerCase: info.name.toLowerCase(),
    };
    setupNewUser(info, function () {});

    save.restore();
    sinon.assert.calledWith(save, expectedUser);
  });
});
