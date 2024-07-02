"use strict";

const myService = require("./myService");
const formEmail = require("./form-email-template");
const formSubmission = require("./form-submission");
const formType = require("./form-type");
const formRedirect = require("./form-redirect");

module.exports = {
  myService,
  "form-email-template": formEmail,
  "form-submission": formSubmission,
  "form-type": formType,
  "form-redirect": formRedirect,
};
