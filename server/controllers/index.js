const formEmail = require("./form-email-template");
const formSubmission = require("./form-submission");
const formType = require("./form-type");
const formRedirect = require("./form-redirect");
const myController = require("./myController");

module.exports = {
  myController,
  "form-email-template": formEmail,
  "form-submission": formSubmission,
  "form-type": formType,
  "form-redirect": formRedirect,
};
