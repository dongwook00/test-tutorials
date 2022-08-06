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

  it("should pass object with correct values to save", function () {
    var save = sinon.stub(Database, "save");
    var info = { name: "John Doe" };
    var expectedUser = {
      name: info.name,
      nameLowerCase: info.name.toLowerCase(),
    };

    setupNewUser(info, function () {});

    save.restore();
    sinon.assert.calledWith(save, expectedUser);
  });

  it("should pass the error into the callback if save fails", function () {
    var expectedError = new Error("opps");
    var save = sinon.stub(Database, "save");
    save.throws(expectedError);
    var callback = sinon.spy();

    setupNewUser({ name: "foo" }, callback);
    save.restore();
    sinon.assert.calledWith(callback, expectedError);
  });

  it("should pass the database result into the callback", function () {
    var expectedResult = { success: true };
    var save = sinon.stub(Database, "save");
    save.yields(null, expectedResult);
    var callback = sinon.spy();
    setupNewUser({ name: "foo" }, callback);

    save.restore();
    sinon.assert.calledWith(callback, null, expectedResult);
  });
});
