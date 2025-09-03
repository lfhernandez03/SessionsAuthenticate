const userDAO = require("../dao/user");
const bcrypt = require("bcrypt");

async function login(email, password) {
  try {
    const user = await userDAO.findUserByEmail(email);
    const match = await bcrypt.compare(password, user.pwHash);

    if (match) {
      console.log("Login Succesfully");
      return { id: user.id, roles: user.roles };
    } else {
      return Promise.reject("Wrong username or password");
    }
  } catch (error) {
    return Promise.reject(error);
  }
}

module.exports = { login };
