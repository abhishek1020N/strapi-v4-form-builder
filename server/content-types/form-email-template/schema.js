module.exports = {
  schema: {
    kind: "collectionType",
    collectionName: "form_email_templates",
    info: {
      singularName: "form-email-template",
      pluralName: "form-email-templates",
      displayName: "Form Email Template",
    },
    options: {
      draftAndPublish: true,
      comment: "",
    },
    attributes: {
      formTypes: {
        type: "relation",
        relation: "manyToMany",
        target: "plugin::strapi-form-builder.form-type",
        inversedBy: "emailTemplates",
      },
      name: {
        pluginOptions: {
          i18n: {
            localized: true,
          },
        },
        type: "string",
      },
      content: {
        pluginOptions: {
          i18n: {
            localized: true,
          },
        },
        type: "richtext",
      },
      senderEmail: {
        pluginOptions: {
          i18n: {
            localized: true,
          },
        },
        type: "string",
      },
      recipientEmail: {
        pluginOptions: {
          i18n: {
            localized: true,
          },
        },
        type: "string",
      },
      sendToUser: {
        pluginOptions: {
          i18n: {
            localized: true,
          },
        },
        type: "boolean",
        default: false,
      },
    },
  },
};
