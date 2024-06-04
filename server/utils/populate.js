const { merge } = require("lodash/fp");
const getDeepPopulate = (uid, populate) => {
  if (populate) {
    return populate;
  }

  const { attributes } = strapi.getModel(uid);

  return Object.keys(attributes).reduce((populateAcc, attributeName) => {
    const attribute = attributes[attributeName];

    if (attribute.type === "relation") {
      populateAcc[attributeName] = { populate: "*" }; // Only populate first level of relations
    }

    if (attribute.type === "component") {
      populateAcc[attributeName] = {
        populate: getDeepPopulate(attribute.component, null),
      };
    }

    if (attribute.type === "media") {
      populateAcc[attributeName] = { populate: "folder" };
    }

    if (attribute.type === "dynamiczone") {
      populateAcc[attributeName] = {
        populate: (attribute.components || []).reduce((acc, componentUID) => {
          return merge(acc, getDeepPopulate(componentUID, null));
        }, {}),
      };
    }

    return populateAcc;
  }, {});
};
const chunkArray = (array, chunkSize) => {
  return Array.from(
    { length: Math.ceil(array.length / chunkSize) },
    (_, index) => array.slice(index * chunkSize, (index + 1) * chunkSize)
  );
};
exports.default = getDeepPopulate;
exports.chunkArray = chunkArray;
