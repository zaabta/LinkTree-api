const { responses, isEmailValid } = require("../../helper");
const service = require("../service");
const auth = require("../../auth");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const { getStorage } = require("firebase/storage");
const firebase = require("../../firebase/config");
const storage = getStorage(firebase);

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
    console.log("result",result)
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
      const token = auth.signUser(user);
      if (token) {
        res.cookie("jwt", token);
        return responses.successWithMessage(
          "you signin successfully",
          res,
          token
        );
      }
    }
    return responses.failedWithMessage("Please SignUp", res);
  } catch (err) {
    console.log("ERROR-->", err);
    return responses.serverError(res);
  }
};

const upload = async (req, res, next) => {
  try {
    const fileTypes = ["png", "jpg", "jpeg", "gif", "JPG", "svg", "gif"];
    const file = req?.file;
    if(!file)
      return responses.failedWithMessage("file has not been uploaded !", res);
    const userId = req?.user?.id
    const uniqueFileName = `images/${
        file?.originalname?.split(".")[0]
      }%%${new Date().valueOf()}.${file?.originalname?.split(".")[1]}`; 
    const imageRef = ref(storage, uniqueFileName); 
    const metaType = { contentType: file?.mimetype, name: file?.originalname };
    if(!fileTypes.includes(file?.originalname?.split(".")[1]))
      return responses.failedWithMessage(`please upload file with those types: ${fileTypes} `,res);
    await uploadBytes(imageRef, file?.buffer, metaType).then(async () => {
        const publicUrl = await getDownloadURL(imageRef);
        const result = await service.addImageToProfilePic({userId, publicUrl});
        if (!result) return responses.failedWithMessage("Failed to change profile pic", res);
        return responses.successWithMessage(`Profile picture changed successfully`, res, { urlImage: publicUrl});
      }).catch((e) => {
        console.error(e);
        return response.failedWithMessage(e.message, res);
      })  
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
