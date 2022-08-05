const assert = require("assert");
const greeter = require("../greeter.js");

describe("testing the greeter", function () {
  if (
    ("checks the greet function",
    function () {
      assert.equal(
        greeter.greet("Alice"),
        "Hello, Alice! Today is Friday, January 15, 2021."
      );
    })
  );
});
