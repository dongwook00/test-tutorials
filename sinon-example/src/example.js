const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require("jquery")(window);

module.exports = {
  name: "",
  testMe: function (callback) {
    callback();
  },
  setUsername: function (name) {
    console.log("setusername", name);
    this.name = name;
  },
  saveUser: function (user, callback) {
    $.post("https://reqres.in/api/users", user, callback);
  },
};
