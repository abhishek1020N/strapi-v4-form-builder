const axios = require("axios").default;
const { errors } = require("@strapi/utils");
const { PolicyError } = errors;
exports.verifyCaptcha = async (ctx) => {
  try {
    ctx.request.body = JSON.parse(ctx.request.body);
    let requestBody = ctx.request.body;
    const contentType = ctx.request.headers["content-type"];
    if (contentType.startsWith("multipart/form-data")) {
      const { data } = parseMultipartData(ctx);
      requestBody = JSON.parse(data.data);
    }
    const { XCaptcha } = requestBody;
    const recaptchaSecret =
      strapi.config.get("constants.RECAPTCHA_SECRET") || "";
    const param = new URLSearchParams({
      secret: encodeURIComponent(recaptchaSecret),
      response: encodeURIComponent(XCaptcha),
    });
    const url = `${strapi.config.get("constants.RECAPTCH_BASE_URL")}?${param}`;

    const googleResponse = await axios.post(url);

    if (googleResponse.data && googleResponse.data.success) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};
