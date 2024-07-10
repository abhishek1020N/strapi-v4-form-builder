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
    },
    pluginOptions: {
      i18n: {
        localized: true,
      },
    },
    attributes: {
      formTypes: {
        type: "relation",
        relation: "manyToMany",
        target: "plugin::strapi-v4-form-builder.form-type",
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
      subject: {
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
        type: "customField",
        options: {
          output: "HTML",
          preset: "standard",
        },
        customField: "plugin::ckeditor.CKEditor",
      },
      senderEmail: {
        pluginOptions: {
          i18n: {
            localized: true,
          },
        },
        type: "string",
      },
      isAdmin: {
        pluginOptions: {
          i18n: {
            localized: false,
          },
        },
        type: "boolean",
        default: false,
      },
      recipientEmail: {
        pluginOptions: {
          i18n: {
            localized: true,
          },
        },
        type: "string",
      },
      enableEmail: {
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
