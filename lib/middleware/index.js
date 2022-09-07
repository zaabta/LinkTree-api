const auth  = require("../auth")
const models = require("../../models")
const { responses } = require("../helper")

const isAuthenticated = async (req, res, next) => {
    try {
        const token =
      req?.cookies?.jwt ||
      req?.headers?.authorization?.split(" ")[1] ||
      req?.headers?.Authorization?.split(" ")[1] ||
      null;
      if(!token) return responses.unauthenticated(res);

      const isVerified = await auth.verifyUser({req, res, token})
      if(!isVerified) return responses.unauthenticated(res);
      const isActive = await models.User.findByPk(req?.user?.id);
      if(!isActive) return responses.failedWithMessage("Your account is no longer active", res);
      return next();
    } catch(err) {
        console.log("Error -->", err);
        return responses.unauthenticated(res);
    }
} 


module.exports = {
    isAuthenticated
}