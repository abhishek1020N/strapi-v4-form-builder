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
      if (ctx.is("multipart")) {
        const { data, files } = parseMultipartData(ctx);
        const uploadService = strapi.plugin("upload").service("upload");
        let submitData = data;
        let formType = await strapi.entityService.findOne(
          formTypeModel,
          submitData.formType,
          {
            populate: { formFields: { populate: { selectOptions: true } } },
          }
        );
        for (const dataKey of submitData?.jsonSubmission) {
          const formTypeField = formType?.formFields?.find(
            (f) => f.submissionKey == dataKey.key
          );
          let fileList = files[dataKey.key];
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
          dataKey.parentSubmissionKey =
            formTypeField?.parentSubmissionKey ?? "";
          dataKey.required = formTypeField?.required ?? false;
          dataKey.formOrder = formTypeField?.formOrder ?? 0;
          dataKey.maxFiles = formTypeField?.maxFiles;
          dataKey.files = fileArr;
        }
        return await strapi.entityService.create(currentModel, {
          data: submitData,
        });
      } else {
        return super.create(ctx);
      }
    } catch (error) {
      console.log(error);
    }
  },
}));
