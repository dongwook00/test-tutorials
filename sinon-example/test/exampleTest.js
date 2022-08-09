const example = require("../src/example");
const sinon = require("sinon");

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
