const { isEmailValid, responses } = require("../../helper");
const service = require("../service");

const subscribe = async (req, res, next) => {
  try {
    const { email } = req?.body;
    if (isEmailValid(email)) {
      const result = await service.subscribe({ email });
      if (result)
        return responses.successWithMessage("Thank you for subscribing", res);
      return responses.failedWithMessage(
        "You are already subscribed to our newsletter",
        res
      );
    }
    return responses.failedWithMessage("email is invalid", res);
  } catch (err) {
    console.log("ERORR-->", err);
    responses.serverError(res);
  }
};

const getSubscribers = async (req, res, next) => {
  try {
    const Subscribers = await service.getSubscribers({});
    if (Subscribers?.length > 0)
      return responses.successWithMessage(
        "sucess get the Subscribers",
        res,
        Subscribers
      );
    return responses.failedWithMessage("no Subscribers found !", res);
  } catch (err) {
    console.log("ERORR-->", err);
    responses.serverError(res);
  }
};
module.exports = {
  subscribe,
  getSubscribers,
};
