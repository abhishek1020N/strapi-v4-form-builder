const { verifyToken } = require("./token");
const formTypeModel = "plugin::strapi-v4-form-builder.form-type";
const { parseMultipartData, errors } = require("@strapi/utils");
const { PolicyError } = errors;

const verifyCSRFToken = async (ctx) => {
  try {
    let requestBody = ctx.request.body;
    const contentType = ctx.request.headers["content-type"];
    if (contentType.startsWith("multipart/form-data")) {
      const { data } = parseMultipartData(ctx);
      requestBody = JSON.parse(data.data);
    }
    const { formType, csrfToken } = requestBody;
    if (!formType > 0) {
      throw new PolicyError("Invalid Form Type");
    }
    const formTypeRecord = await strapi.entityService.findOne(
      formTypeModel,
      formType
    );
    if (!formTypeRecord) {
      throw new PolicyError("Form Type Not found");
    }
    const isValid = verifyToken(csrfToken);
    if (!isValid) {
      throw new PolicyError("Invalid CSRF Token");
    }
    return isValid;
  } catch (error) {
    return false;
  }
};

exports.verifyCSRFToken = verifyCSRFToken;
