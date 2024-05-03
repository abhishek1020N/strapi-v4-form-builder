"use strict";

const formEmail = require("./form-email-template/schema");
const formSubmission = require("./form-submission/schema");
const formType = require("./form-type/schema");

module.exports = {
  "form-email-template": formEmail,
  "form-submission": formSubmission,
  "form-type": formType,
};
