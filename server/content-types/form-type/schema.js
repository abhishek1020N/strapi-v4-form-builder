module.exports = {
  schema: {
    kind: "collectionType",
    collectionName: "form_types",
    info: {
      singularName: "form-type",
      pluralName: "form-types",
      displayName: "Form Type",
      description: "",
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
      formName: {
        pluginOptions: {
          i18n: {
            localized: true,
          },
        },
        type: "string",
      },
      formID: {
        pluginOptions: {
          i18n: {
            localized: true,
          },
        },
        type: "uid",
        targetField: "formName",
      },
      formFields: {
        displayName: "Form Fields",
        type: "component",
        repeatable: true,
        pluginOptions: {
          i18n: {
            localized: true,
          },
        },
        component: "form.form-fields",
      },
      formCSFRTokenExpiry: {
        type: "integer",
      },
      formSubmissions: {
        type: "relation",
        relation: "oneToMany",
        target: "plugin::strapi-v4-form-builder.form-submission",
        mappedBy: "formType",
      },
      emailTemplates: {
        type: "relation",
        relation: "manyToMany",
        target: "plugin::strapi-v4-form-builder.form-email-template",
        mappedBy: "formTypes",
      },
      formDescription: {
        pluginOptions: {
          i18n: {
            localized: true,
          },
        },
        type: "text",
      },
      formRedirect: {
        pluginOptions: {
          i18n: {
            localized: true,
          },
        },
        type: "relation",
        relation: "oneToOne",
        target: "plugin::strapi-v4-form-builder.form-redirect",
        mappedBy: "formType",
      },
    },
  },
};
