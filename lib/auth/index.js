const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

var authService = {
  signUser: (user) => {
    const token = jwt.sign(
      {
        // this object will be saved in the token payload
        id: user.id,
        email: user.email,
        roleId: user.userRoleId,
      },
      process.env.JWT_SECRET, // this will read from the .env file a key named JWT_SECRET and will take the value
      {
        expiresIn: "2h",
      }
    );
    return token;
  },

  verifyUser: ({ req, res, token }) => {
    try {
      if (!token)
        return res
          .status(401)
          .send({ auth: false, message: "No token provided." });
      // verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if(decoded){
        req.user = {
          id: decoded?.id,
          email: decoded?.email,
          userRoleId: decoded?.roleId,
          token: token,
        }
        return decoded
      } else{
        return null
      } 
    } catch (err) {
      console.log(err);
      return res.status(500).send("Server Error");
    }
  },
  
  hashPassword: function (plainTextPassword) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(plainTextPassword, salt);
    return hash;
  },
  comparePasswords: function (plainTextPassword, hashedPassword) {
    return bcrypt.compareSync(plainTextPassword, hashedPassword);
  },
};

module.exports = authService;
