const models = require("../../../models");
const { Op, fn } = require("sequelize");

const setLink = async ({ url, linkTypeId, userId, order }) => {
  try {
    const [link, created] = await models.Link.findOrCreate({
      where: {
        [Op.and]: [{ url }, { linkTypeId }, { userId }, { deletedAt: { [Op.eq]: null } }],
      },
      defaults: {
        userId,
        linkTypeId,
        url,
        order,
      },
    });
    if (created) return link;
    return null;
  } catch (err) {
    console.log("ERROR--> ", err);
    throw new Error(err);
  }
};

const getLinks = async ({ userId }) => {
  try {
    const links = await models.Link.findAll({
      where: {
        [Op.and]: [{ userId }, { deletedAt: { [Op.eq]: null } }], // when the link is not deleted
      },
      include: [{ model: models.LinkType }],
    });
    if (Array.isArray(links) && links?.length > 0) return links;
    return null;
  } catch (err) {
    console.log("ERROR--> ", err);
    throw new Error(err);
  }
};

const getLink = async ({ id, userId }) => {
  try {
    const link = await models.Link.findOne({
      where: {
        [Op.and]: [{ id }, {userId}, { deletedAt: { [Op.eq]: null } }],
      },
      include: [{ model: models.LinkType }],
    });
    return link;
  } catch (err) {
    console.log("ERROR--> ", err);
    throw new Error(err);
  }
};

const editLink = async ({ userId, id, url, linkTypeId }) => {
  try {
    const link = await models.Link.update(
      {
        url,
        linkTypeId,
      },
      {
        where: { [Op.and]: [{ userId }, { id }] },
      }
    );
    return link
  } catch (err) {
    console.log("ERROR--> ", err);
    throw new Error(err);
  }
};

const deleteLink = async ({ userId, id }) => {
  try {
    const link = await models.Link.update(
      {
        deletedAt: fn("now")
      },
      {
        where: { [Op.and]: [{ userId }, { id }] },
      }
    );
    return link
  } catch (err) {
    console.log("ERROR--> ", err);
    throw new Error(err);
  }
};

module.exports = {
  setLink,
  getLinks,
  getLink,
  editLink,
  deleteLink
};
