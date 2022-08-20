const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require("jquery")(window);

var saveUser = function (user, callback) {
  $.post("https://reqres.in/api/users", user, callback);
};

module.exports = {
  saveUser: saveUser,
};
