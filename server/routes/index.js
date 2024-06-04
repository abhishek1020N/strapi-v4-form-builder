const formEmail = require("./form-email-template");
const formSubmission = require("./form-submission");
const formType = require("./form-type");
const adminRoutes = require("./admin");

module.exports = {
  adminRoutes,
  "form-email-template": formEmail,
  "form-submission": formSubmission,
  "form-type": formType,
};
