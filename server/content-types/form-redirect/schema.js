module.exports = {
  schema: {
    kind: "collectionType",
    collectionName: "form_redirects",
    info: {
      singularName: "form-redirect",
      pluralName: "form-redirects",
      displayName: "Form Redirects",
    },
    options: {
      draftAndPublish: false,
      comment: "",
    },
    options: {
      draftAndPublish: true,
      comment: "",
    },
    attributes: {
      title: {
        pluginOptions: {
          i18n: {
            localized: true,
          },
        },
        type: "string",
      },
      subtitle: {
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
      type: {
        pluginOptions: {
          i18n: {
            localized: false,
          },
        },
        type: "enumeration",
        enum: ["alert", "popup", "bottomsheet", "page"],
        default: "alert",
      },
      route: {
        pluginOptions: {
          i18n: {
            localized: true,
          },
        },
        type: "string",
      },
      image: {
        allowedTypes: ["images", "files"],
        type: "media",
        multiple: false,
      },
      formType: {
        type: "relation",
        relation: "oneToOne",
        target: "plugin::strapi-v4-form-builder.form-type",
        inversedBy: "formRedirect",
      },
      buttons: {
        type: "component",
        repeatable: true,
        component: "form.redirect-buttons",
      },
    },
  },
};
