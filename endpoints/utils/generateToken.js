const jwt = require("jsonwebtoken");

const generateToken = (_id, userID, userName, isAdministrator) => {
  console.log('Signing token for ID ', _id,userID);
  console.log('Secret key is ', process.env.JWT_KEY);
  const token = jwt.sign({ _id:_id, userID: userID, userName: userName ,isAdministrator: isAdministrator }, process.env.JWT_KEY, {
    expiresIn: "30d",
  });
  console.log('Signed token: ', token);
  return token;
};


module.exports = generateToken;