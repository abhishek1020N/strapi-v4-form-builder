module.exports = {
  schema: {
    kind: "collectionType",
    collectionName: "form_submissions",
    info: {
      singularName: "form-submission",
      pluralName: "form-submissions",
      displayName: "Form Submission",
      description: "",
    },
    options: {
      draftAndPublish: false,
    },
    pluginOptions: {
      i18n: {
        localized: true,
      },
    },
    attributes: {
      formType: {
        type: "relation",
        relation: "manyToOne",
        target: "plugin::strapi-v4-form-builder.form-type",
        inversedBy: "formSubmissions",
      },
      jsonSubmission: {
        pluginOptions: {
          i18n: {
            localized: true,
          },
        },
        type: "json",
      },
    },
  },
};
