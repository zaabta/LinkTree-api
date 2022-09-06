const models = require("../../../models");
const auth = require("../../auth");
const { Op } = require("sequelize");

const createAccount = async ({ username, password, email }) => {
  try {
    const role = await models.Role.findOne({
      where: {
        name: "user",
      },
    });
    if (!role) return null;
    const [user, created] = await models.User.findOrCreate({
      where: {
        [Op.or]: [{ username }, { email }],
      },
      defaults: {
        username,
        email,
        password: auth.hashPassword(password),
        userRoleId: role?.id,
      },
    });
    if (created) return user;
    return null;
  } catch (err) {
    throw new Error(err);
  }
};

const login = async ({ account, password }) => {
  try {
    const user = await models.User.findOne({
      where: {
        [Op.or]: [{ username: account }, { email: account }],
      },
    });
    if(user){
        if(auth.comparePasswords(password, user?.password))
            return user
        else return null    
    }
    return null
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  createAccount,
  login,
};
