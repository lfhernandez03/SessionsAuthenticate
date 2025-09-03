const bcrypt = require("bcrypt");

const users = {
  "user1@example.com": {
    pwHash: bcrypt.hashSync("user1pw", 10),
    roles: ["ADMIN"],
    id: "f4e790fc-964e-4e9c-8829-529a7059e684",
  },
  "user2@example.com": {
    pwHash: bcrypt.hashSync("user2pw", 10),
    roles: ["USER"],
    id: "fe9ac1d3-d5ef-491d-ab16-4b5d429e85cb",
  },
};

function findUserByEmail(email) {
  const user = users[email];
  return user ? user : Promise.reject("User not found");
}

module.exports = { findUserByEmail };
