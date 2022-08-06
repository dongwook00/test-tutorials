const Database = require("./Database");

function setupNewUser(info, callback) {
  var user = {
    name: info.name,
    nameLowerCase: info.name.toLowerCase(),
  };

  try {
    Database.save(user, callback);
  } catch (err) {
    console.error("error", err);
    callback(err);
  }
}
module.exports = setupNewUser;
