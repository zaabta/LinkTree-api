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
    if(created) {
    const [userInfo, userInfoCreated] = await models.UserInfo.findOrCreate({
        where: {
          user_id: user?.id,
        },
        defaults: {
          user_id: user?.id,
          profile_pic:"https://firebasestorage.googleapis.com/v0/b/linktree-a8b23.appspot.com/o/Linktree-Logo-768x432.png?alt=media&token=bd9af796-aecb-4e7a-95f6-3602403478a0",
          bg_pic: "https://firebasestorage.googleapis.com/v0/b/linktree-a8b23.appspot.com/o/deaflutImg.png?alt=media&token=c7633992-0911-4755-9641-77d287cd9168",
          nickname: user?.username,
          bio: "linkTree"
        }
      })
    if(userInfoCreated) return user
    }
    return null
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
    if (user) {
      if (auth.comparePasswords(password, user?.password)) return user;
      else return null;
    }
    return null;
  } catch (err) {
    throw new Error(err);
  }
};

const addImageToProfilePic = async ({
  userId: user_id,
  publicUrl: profile_pic,
}) => {
  try {
    const result = await models.UserInfo.update(
      { profile_pic },
      {
        where: {
          user_id,
        },
      }
    );
    return result;
  } catch (err) {
    throw new Error(err);
  }
};


const getUserProfile = async ({userId: user_id}) => {
  try {
    const userInfo = await models.UserInfo.findOne({
      where: {
        user_id
      }
    })
    return userInfo
  }catch (err) {
      throw new Error(err);
    }
}

module.exports = {
  createAccount,
  login,
  addImageToProfilePic,
  getUserProfile
};
