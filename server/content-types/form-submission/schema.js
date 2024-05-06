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
      draftAndPublish: true,
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
      formFieldsSubmission: {
        displayName: "Form Fields Submission",
        type: "component",
        repeatable: true,
        pluginOptions: {
          i18n: {
            localized: true,
          },
        },
        component: "form.form-fields-submission",
      },
    },
  },
};
