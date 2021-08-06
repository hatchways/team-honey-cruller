const jwt = require('jsonwebtoken');

const passwordToken = (userId) => {
  const token = jwt.sign({ userId } , process.env.JWT_SECRET, { expiresIn: 300 });

  return token;
};

module.exports = passwordToken;
