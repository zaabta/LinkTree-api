const { responses, isEmailValid } = require("../../helper");
const service = require("../service");
const auth = require("../../auth");

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
      const user = await service.login({account, password})
      if(user) {
         const token = auth.signUser(user)
         if(token) {
            res.cookie("jwt", token)
            return responses.successWithMessage("you signin successfully", res, token)
         } 
      }
      return responses.failedWithMessage("Please SignUp", res)
  } catch (err) {
    console.log("ERROR-->", err);
    throw new Error(err);
  }
};

module.exports = {
  createAccount,
  login,
};
