const store = require("./store");

function addUser(name) {
  if (!name) {
    return Promise.reject("Invalid name");
  }

  const user = {
    name,
  };

  return store.addUser(user);
}

function getUsers() {
  return store.listUsers();
}
module.exports = {
  addUser,
  getUsers,
};
