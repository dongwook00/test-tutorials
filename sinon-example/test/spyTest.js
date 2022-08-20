const sinon = require("sinon");

var spy = sinon.spy();
spy("Hello", "World");
console.log(spy.firstCall.args);

var user = {
  setName: function (name) {
    this.name = name;
  },
};

var setNameSpy = sinon.spy(user, "setName");
user.setName("Darth Vader");
console.log(setNameSpy.callCount);
setNameSpy.restore();

function myFunction(condition, callback) {
  if (condition) {
    callback();
  }
}

describe("myFunction", function () {
  it("should call the callback function", function () {
    var callback = sinon.spy();
    myFunction(true, callback);
    console.log("myFunction", callback.calledOnce);
  });
});

var stub = sinon.stub();
stub("hello");
console.log(stub.firstCall.args);
