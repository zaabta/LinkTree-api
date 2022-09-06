const models = require("../../../models");

const subscribe = async ({ email }) => {
  try {
    const [result, created] = await models.Subscribe.findOrCreate({
      where: {
        email,
      },
    });
    if (created) return result;
    return null;
  } catch (err) {
    return null;
  }
};

const getSubscribers = async ({}) => {
  try {
    const result = await models.Subscribe.findAll({});
    if (Array.isArray(result) && result?.length > 0) return result;
    return null;
  } catch (err) {
    throw new Error(err)
  }
};

module.exports = {
  subscribe,
  getSubscribers,
};
