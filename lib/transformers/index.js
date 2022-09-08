const linkTransformer = (link) => {
  console.log(link);
  if (link && link["dataValues"]) {
    delete link["dataValues"]["deletedAt"];
    delete link["dataValues"]["createdAt"];
    delete link["dataValues"]["updatedAt"];
    delete link["dataValues"]["LinkTypeId"];
    delete link["dataValues"]["LinkType"]["dataValues"]["deletedAt"];
    delete link["dataValues"]["LinkType"]["dataValues"]["createdAt"];
    delete link["dataValues"]["LinkType"]["dataValues"]["updatedAt"];
  }
  return link;
};

const linksTransformer = (links) => {
  if (Array.isArray(links) && links?.length > 0) {
    links?.map((link) => linkTransformer(link));
  }
  return links;
};

const linkTypeTransformer = (linkType) => {
  if (linkType && linkType["dataValues"]) {
    delete linkType["dataValues"]["deletedAt"];
    delete linkType["dataValues"]["createdAt"];
    delete linkType["dataValues"]["updatedAt"];
  }
  return linkType
};

const linkTypesTransformer = (linkTypes) => {
  if(Array.isArray(linkTypes) && linkTypes?.length > 0){
    linkTypes.map(linkType => linkTypeTransformer(linkType))
  }
  return linkTypes
} 

module.exports = {
  linkTransformer,
  linksTransformer,
  linkTypeTransformer,
  linkTypesTransformer
};
