"use strict";

/**
 *  controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const currentModel = "plugin::strapi-v4-form-builder.form-submission";
const deepPopulate = require("../utils/populate").default;
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
        for (const dataKey of submitData?.jsonSubmission) {
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
          dataKey.files = fileArr;
        }
        return await strapi.entityService.create(currentModel, {
          data: submitData,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
}));
