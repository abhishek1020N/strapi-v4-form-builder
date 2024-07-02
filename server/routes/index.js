const formEmail = require("./form-email-template");
const formSubmission = require("./form-submission");
const formType = require("./form-type");
const formRedirect = require("./form-redirect");
const adminRoutes = require("./admin");

module.exports = {
  adminRoutes,
  "form-email-template": formEmail,
  "form-submission": formSubmission,
  "form-type": formType,
  "form-redirect": formRedirect,
};
