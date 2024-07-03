"use strict";

/**
 *  controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const currentModel = "plugin::strapi-v4-form-builder.form-submission";
const formTypeModel = "plugin::strapi-v4-form-builder.form-type";
const deepPopulate = require("../utils/populate").default;
const _ = require("lodash");
const { parseMultipartData } = require("@strapi/utils");

module.exports = createCoreController(currentModel, ({ strapi }) => ({
  async getFormSubmissions(ctx) {
    if (ctx.query.populate === "*") {
      const entity = await strapi.entityService.findMany(currentModel, {
        ...ctx.query,
        populate: deepPopulate(currentModel),
      });
      return this.transformResponse(entity);
    }
    // maintain default functionality for all other request
    return super.find(ctx);
  },

  async getAllFormSubmissions(ctx) {
    const entity = await strapi.entityService.findMany(currentModel, {
      ...ctx.query,
      populate: deepPopulate(currentModel),
      limit: -1,
    });
    return this.transformResponse(entity);
  },

  async submitForm(ctx) {
    try {
      let submitData = {};
      let uploadedFiles = [];
      const uploadService = strapi.plugin("upload").service("upload");

      if (ctx.is("multipart")) {
        const { data, files } = parseMultipartData(ctx);
        uploadedFiles = files;
        submitData = data;
      } else {
        submitData = ctx.request.body?.data;
      }
      let formType = await strapi.entityService.findOne(
        formTypeModel,
        submitData.formType,
        {
          populate: {
            emailTemplates: true,
            formFields: { populate: { selectOptions: true } },
          },
        }
      );
      let submitterEmail = [];
      for (const dataKey of submitData?.jsonSubmission) {
        const formTypeField = formType?.formFields?.find(
          (f) => f.submissionKey == dataKey.key
        );
        let fileList = uploadedFiles[dataKey.key];
        let fileArr = [];
        if (fileList) {
          fileList = fileList?.size > 0 ? [fileList] : fileList;
          for (const file of fileList) {
            const [uploadedFile] = await uploadService.upload({
              data: {}, // additional data to pass
              files: [file], // the actual file(s)
            });
            fileArr.push(uploadedFile);
          }
        }
        dataKey.label = formTypeField?.label ?? "";
        dataKey.fieldType = formTypeField?.fieldType ?? "";
        dataKey.parentSubmissionKey = formTypeField?.parentSubmissionKey ?? "";
        dataKey.required = formTypeField?.required ?? false;
        dataKey.formOrder = formTypeField?.formOrder ?? 0;
        dataKey.maxFiles = formTypeField?.maxFiles;
        dataKey.files = fileArr;
        if (formTypeField?.fieldType === "email") {
          submitterEmail.push(dataKey.value);
        }
      }
      const res = await strapi.entityService.create(currentModel, {
        data: submitData,
      });
      if (res?.id) {
        await strapi
          .service(currentModel)
          .sendEmail(formType, res, submitterEmail, ctx);
      }
      return res;
    } catch (error) {
      console.log(error);
    }
  },

  async sendEmail(formType, data, clientEmails = [], ctx = {}) {
    try {
      for (const mailTemplate of formType?.emailTemplates) {
        const [emailTemplate] = await strapi.entityService.findMany(
          "plugin::strapi-v4-form-builder.form-email-template",
          {
            filters: { id: mailTemplate, sendToUser: true },
            locale: ctx.locale,
          }
        );

        if (emailTemplate?.id > 0) {
          const htmlEmail = emailTemplate?.content;

          const template = Handlebars.compile(htmlEmail);

          let emailTemplateData = template(data);
          let recieverEmails = clientEmails;
          if (emailTemplate?.isAdmin && emailTemplate?.recipientEmail) {
            recieverEmails = emailTemplate?.recipientEmail?.split(",");
          }

          for (const toEmail of recieverEmails) {
            const emailObject = {
              to: toEmail,
              subject: emailTemplate.subject,
              html: emailTemplateData,
            };
            //for mandrill
            if (emailTemplate?.senderEmail)
              emailObject.from_email = emailTemplate?.senderEmail;
            console.log(`EMAIL_OBJECT:`, emailObject);
            strapi.plugins["email"].services.email.send(emailObject);
            console.log(`EMAIL_SENT: subject=${emailObject?.subject}`);
          }
        }
      }
      return true;
    } catch (error) {
      console.log("sendEmail-Error:", error);
      return { error: error };
    }
  },
}));
