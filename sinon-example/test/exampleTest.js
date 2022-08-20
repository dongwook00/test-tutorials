const example = require("../src/example");
const sinon = require("sinon");
const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require("jquery")(window);

describe("testMe function", function () {
  it("should call the callback", function () {
    let callbackSpy = sinon.spy();
    example.testMe(callbackSpy);
    sinon.assert.calledOnce(callbackSpy);
  });
});

describe("setName function", function () {
  it("should be called with name (spy)", function () {
    let setUsernameSpy = sinon.spy(example, "setUsername");
    example.setUsername("Harry Potter");
    sinon.assert.calledOnce(setUsernameSpy);
    sinon.assert.calledWith(setUsernameSpy, "Harry Potter");
    setUsernameSpy.restore();
  });

  it("should be called with name (stub)", function () {
    let setUsernameStub = sinon.stub(example, "setUsername");
    example.setUsername("Harry Potter");
    sinon.assert.calledOnce(setUsernameStub);
    sinon.assert.calledWith(setUsernameStub, "Harry Potter");
    setUsernameStub.restore();
  });
});

describe("saveUser", function () {
  it("should call callback after saving", function () {
    var post = sinon.stub($, "post");
    post.yields();
    var callback = sinon.spy();

    example.saveUser({ name: "morpheus", job: "leader" }, callback);
    post.restore();
    sinon.assert.calledOnce(callback);
  });
});

xdescribe("saveUser", function () {
  it("should send correct parameters to the expected URL", function () {
    let post = sinon.stub(jQuery, "post");

    let expectedUrl = "/users";
    let expectedParams = {
      first: "Expected first name",
      last: "Expected last name",
    };
    let testUser = {
      firstname: expectedParams.first,
      lastname: expectedParams.last,
    };

    example.saveUser(testUser, function () {});
    sinon.assert.calledWith(post, expectedUrl, expectedParams);
    post.restore();
  });
});
