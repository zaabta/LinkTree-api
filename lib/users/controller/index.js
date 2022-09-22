const { responses, isEmailValid } = require("../../helper");
const service = require("../service");
const auth = require("../../auth");
const transformers = require("../../transformers");
const firebase = require("../../firebase")

const createAccount = async (req, res, next) => {
  try {
    const { username, email, password } = req?.body;
    if (!username || username?.length < 3)
      return responses.failedWithMessage("not Acceptable username", res);
    if (!isEmailValid(email))
      return responses.failedWithMessage("not Acceptable email", res);
    if (password?.length < 5)
      return responses.failedWithMessage("not Acceptable passwrod", res);
    const result = await service.createAccount({ username, email, password });
    console.log("result", result);
    if (result)
      return responses.successWithMessage("account created  successfully", res);
    return responses.failedWithMessage("account already exist", res);
  } catch (err) {
    console.log("ERROR-->", err);
    return responses.serverError(res);
  }
};

const login = async (req, res, next) => {
  try {
    const { account, password } = req?.body;
    if (!account || !password)
      return responses.failedWithMessage(
        "please check your email or password",
        res
      );
    const user = await service.login({ account, password });
    if (user) {
      const userId = user?.id;
      const userInfo = await service.getUserProfile({ userId });
      if (!userInfo) return responses.failedWithMessage("Please SignUp", res);
      const token = auth.signUser(user);
      if (token) {
        res.cookie("jwt", token);
        const result = transformers.userTransformer({
          ...user.dataValues,
          ...userInfo.dataValues,
        });
        return responses.successWithMessage("you signin successfully", res, {
          user: {
            ...result,
          },
          token: token,
        });
      }
    }
    return responses.failedWithMessage(
      "Please ckeck username and password ",
      res
    );
  } catch (err) {
    console.log("ERROR-->", err);
    return responses.serverError(res);
  }
};

const upload = async (req, res, next) => {
  try {
    const fileTypes = ["png", "jpg", "jpeg", "gif", "JPG", "svg", "gif"];
    const file = req?.file;
    if (!file)
      return responses.failedWithMessage("file has not been uploaded !", res);
    const userId = req?.user?.id;
    const fileInfo = file?.originalname?.split(".")
    const uniqueFileName = `images/${
      fileInfo[0]
    }%%${new Date().valueOf()}.${fileInfo[fileInfo?.length - 1]}`;
    const imageRef = firebase.ref(firebase.storage, uniqueFileName);
    const metaType = { contentType: file?.mimetype, name: file?.originalname };
    if (!fileTypes.includes(fileInfo[fileInfo?.length - 1]))
      return responses.failedWithMessage(
        `please upload file with those types: ${fileTypes} `,
        res
      );
    await firebase.uploadBytes(imageRef, file?.buffer, metaType)
      .then(async () => {
        const publicUrl = await firebase.getDownloadURL(imageRef);
        const result = await service.addImageToProfilePic({
          userId,
          publicUrl,
        });
        if (!result)
          return responses.failedWithMessage(
            "Failed to change profile pic",
            res
          );
        return responses.successWithMessage(
          `Profile picture changed successfully`,
          res,
          { urlImage: publicUrl }
        );
      })
      .catch((e) => {
        console.error(e);
        return responses.failedWithMessage(e.message, res);
      });
  } catch (err) {
    console.log("ERROR-->", err);
    return responses.serverError(res);
  }
};

module.exports = {
  createAccount,
  login,
  upload,
};
