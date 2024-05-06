"use strict";

const myService = require("./myService");
const formEmail = require("./form-email-template");
const formSubmission = require("./form-submission");
const formType = require("./form-type");

module.exports = {
  myService,
  "form-email-template": formEmail,
  "form-submission": formSubmission,
  "form-type": formType,
};
