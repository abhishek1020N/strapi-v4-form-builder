const { verifyToken } = require("../utils/token");
const formTypeModel = "plugin::strapi-v4-form-builder.form-type";
const { parseMultipartData, errors } = require("@strapi/utils");
const { PolicyError } = errors;

module.exports = async (ctx, next) => {
  let requestBody = ctx.request.body;
  if (ctx.is("multipart")) {
    const { data } = parseMultipartData(ctx);
    requestBody = data;
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
};
