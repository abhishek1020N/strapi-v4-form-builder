"use strict";

const formEmail = require("./form-email-template/schema");
const formSubmission = require("./form-submission/schema");
const formType = require("./form-type/schema");
const formRedirects = require("./form-redirect/schema");

module.exports = {
  "form-email-template": formEmail,
  "form-submission": formSubmission,
  "form-type": formType,
  "form-redirect": formRedirects,
};
