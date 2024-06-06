const { verifyToken } = require("../utils/token");
const formTypeModel = "plugin::strapi-v4-form-builder.form-type";
const { parseMultipartData, errors } = require("@strapi/utils");
const { PolicyError } = errors;

module.exports = async (ctx, next) => {
  try {
    let requestBody = ctx.request.body;
    const contentType = ctx.request.headers["content-type"];
    if (contentType.startsWith("multipart/form-data")) {
      const { data } = parseMultipartData(ctx);
      requestBody = JSON.parse(data.data);
    }
    const { formType, csrfToken } = requestBody;
    const formTypeRecord = await strapi.entityService.findOne(
      formTypeModel,
      formType
    );
    if (!formTypeRecord) {
      throw new PolicyError("Invalid Form Type");
    }
    const isValid = verifyToken(csrfToken);
    if (!isValid) {
      throw new PolicyError("Invalid CSRF Token");
    }
    return isValid;
  } catch (error) {
    throw new PolicyError("Invalid Request");
  }
};
