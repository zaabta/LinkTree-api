const linkTransformer = (link) => {
  if (link && link["dataValues"]) {
    delete link["dataValues"]["deletedAt"];
    delete link["dataValues"]["createdAt"];
    delete link["dataValues"]["updatedAt"];
  }
  return link;
};

const linksTransformer = (links) => {
    if(Array.isArray(links) && links?.length > 0){
        links.map(link => linkTransformer(link))
    }
    return links
};

module.exports = {
  linkTransformer,
  linksTransformer
};
