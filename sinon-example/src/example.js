const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const jQuery = require("jquery")(window);

module.exports = {
  name: "",
  testMe: function (callback) {
    callback();
  },
  setUsername: function (name) {
    this.name = name;
  },
  saveUser: function (user, callback) {
    jQuery.post(
      "/users",
      {
        first: user.firstname,
        last: user.lastname,
      },
      callback
    );
  },
};
