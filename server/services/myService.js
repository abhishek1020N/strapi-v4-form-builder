// @ts-nocheck
"use strict";
const formBlock = require("../components/form/form-block.json");
const formSubmission = require("../components/form/form-fields-submission.json");
const formFields = require("../components/form/form-fields.json");
const formSelectOptions = require("../components/form/select-options.json");
const formRedirectBlock = require("../components/form/redirect-buttons.json");

module.exports = ({ strapi }) => ({
  getWelcomeMessage() {
    return "Welcome to Strapi 🚀";
  },
  getComponent(componentUID) {
    const formBlockComp = strapi.components[componentUID];
    return formBlockComp
      ? {
          attributes: formBlockComp.attributes,
          category: formBlockComp.category,
          ...formBlockComp,
        }
      : null;
  },
  async createformBlockComp() {
    let response = [];
    try {
      const formBlockComp = await this.getComponent("form.form-block");
      if (formBlock) {
        try {
          if (formBlockComp) {
            const res = await strapi
              .plugin("content-type-builder")
              .services.components.editComponent(formBlockComp.uid, {
                component: {
                  category: "form",
                  displayName: formBlock.info.displayName,
                  icon: formBlock.info.icon,
                  attributes: formBlock.attributes,
                },
              });
            response.push(res);
          } else {
            const res = await strapi
              .plugin("content-type-builder")
              .services.components.createComponent({
                component: {
                  category: "form",
                  displayName: formBlock.info.displayName,
                  icon: formBlock.info.icon,
                  attributes: formBlock.attributes,
                },
              });

            response.push(res);
          }
        } catch (error) {
          console.log(error);
        }
      }

      const formSubmissionComp = await this.getComponent(
        "form.form-fields-submission"
      );

      if (formSubmission) {
        try {
          if (formSubmissionComp) {
            const res = await strapi
              .plugin("content-type-builder")
              .services.components.editComponent(formSubmissionComp.uid, {
                component: {
                  category: "form",
                  displayName: formSubmission.info.displayName,
                  icon: formSubmission.info.icon,
                  attributes: formSubmission.attributes,
                },
              });
            response.push(res);
          } else {
            const res = await strapi
              .plugin("content-type-builder")
              .services.components.createComponent({
                component: {
                  category: "form",
                  displayName: formSubmission.info.displayName,
                  icon: formSubmission.info.icon,
                  attributes: formSubmission.attributes,
                },
              });
            response.push(res);
          }
        } catch (error) {
          console.log(error);
        }
      }

      const formFieldsComp = await this.getComponent("form.form-fields");
      const selectOptionsComp = await this.getComponent("form.select-options");
      if (formSelectOptions && formFields) {
        try {
          if (formFieldsComp) {
            const res = await strapi
              .plugin("content-type-builder")
              .services.components.editComponent(formFieldsComp.uid, {
                component: {
                  category: "form",
                  displayName: formFields.info.displayName,
                  icon: formFields.info.icon,
                  attributes: formFields.attributes,
                },
              });
            response.push(res);
            if (selectOptionsComp) {
              const res = await strapi
                .plugin("content-type-builder")
                .services.components.editComponent(selectOptionsComp.uid, {
                  component: {
                    category: "form",
                    displayName: formSelectOptions.info.displayName,
                    icon: formSelectOptions.info.icon,
                    attributes: formSelectOptions.attributes,
                  },
                });
              response.push(res);
            }
          } else {
            const res = await strapi
              .plugin("content-type-builder")
              .services.components.createComponent({
                component: {
                  category: "form",
                  displayName: formFields.info.displayName,
                  icon: formFields.info.icon,
                  attributes: formFields.attributes,
                },
                components: [
                  {
                    tmpUID: "form.select-options",
                    category: "form",
                    displayName: formSelectOptions.info.displayName,
                    icon: formSelectOptions.info.icon,
                    attributes: formSelectOptions.attributes,
                  },
                ],
              });
            response.push(res);
          }
        } catch (error) {
          console.log(error);
        }
      }

      const formRedirectComp = await this.getComponent("form.redirect-buttons");
      if (formRedirectBlock) {
        try {
          if (formRedirectComp) {
            const res = await strapi
              .plugin("content-type-builder")
              .services.components.editComponent(formRedirectComp.uid, {
                component: {
                  category: "form",
                  displayName: formRedirectBlock.info.displayName,
                  icon: formRedirectBlock.info.icon,
                  attributes: formRedirectBlock.attributes,
                },
              });
            response.push(res);
          } else {
            const res = await strapi
              .plugin("content-type-builder")
              .services.components.createComponent({
                component: {
                  category: "form",
                  displayName: formRedirectBlock.info.displayName,
                  icon: formRedirectBlock.info.icon,
                  attributes: formRedirectBlock.attributes,
                },
              });

            response.push(res);
          }
        } catch (error) {
          console.log(error);
        }
      }
      if (response?.length > 0) return response;
      else return null;
    } catch (error) {
      console.log(
        "Error while generating components in strapi-v4-form-builder"
      );
    }
  },
});
