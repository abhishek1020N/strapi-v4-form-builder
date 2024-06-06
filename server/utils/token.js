const csrf = require("csrf");
const csrfTokens = new csrf();
const jwt = require("jsonwebtoken");
const secretKey = process.env.CSR_SECRET_KEY;

// Generate the token
const generateToken = (expiresIn) => {
  const csrfToken = csrfTokens.create(secretKey);
  expiresIn = expiresIn ?? "1d";

  // Create a JWT that includes the CSRF token and expiration time
  const jwtToken = jwt.sign({ csrfToken }, secretKey, { expiresIn });
  return jwtToken;
};

// Verify the token
const verifyToken = (token) => {
  const decoded = jwt.verify(token, secretKey);
  const { csrfToken } = decoded;
  return csrfTokens.verify(secretKey, csrfToken);
};

exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
