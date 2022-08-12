const example = require("../src/example");
const sinon = require("sinon");
const { saveUser } = require("../src/example");
const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const jQuery = require("jquery")(window);

describe("testMe function", function () {
  it("should call the callback", function () {
    let callbackSpy = sinon.spy();
    example.testMe(callbackSpy);
    sinon.assert.calledOnce(callbackSpy);
  });
});

describe("setName function", function () {
  it("should be called with name", function () {
    let setUsernameSpy = sinon.spy(example, "setUsername");
    example.setUsername("Harry Potter");
    sinon.assert.calledOnce(setUsernameSpy);
    sinon.assert.calledWith(setUsernameSpy, "Harry Potter");
    setUsernameSpy.restore();
  });
});

describe("saveUser", function () {
  it("should call callback after saving", function () {
    let post = sinon.stub(jQuery, "post");
    post.yields();
    let callbackSpy = sinon.spy();
    let testUser = { firstname: "Severus", lastname: "Snape" };

    example.saveUser(testUser, callbackSpy);
    sinon.assert.calledOnce(callbackSpy);
    post.restore();
  });
});

describe("saveUser", function () {
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
