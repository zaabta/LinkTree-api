const {responses} = require("../../helper")
const service = require("../service")
const models = require("../../../models")
const sequelize = require("sequelize")
const transformers = require("../../transformers")

const setLink = async (req, res, next) => {
    try {
        const userId = req?.user?.id
        if(!userId) return responses.unauthenticated(res)
        const {url, linkTypeId} = req?.body;
        if(!url) return responses.failedWithMessage("please Enter you Url!", res)
        if(!linkTypeId) return responses.failedWithMessage("please select you link type!", res)
        const resultQuery = await models.Link.findAll({
            where:{
                userId
            },
            attributes: [[sequelize.fn("max", sequelize.col("order")), "maxOrder"]],
        })
        const order = resultQuery[0]?.dataValues?.maxOrder + 1
        if(!order) order = 1  // optional default value fo order of link
        const link = await service.setLink({url, linkTypeId, userId, order})
        if(link) return responses.successWithMessage("link add it successfully", res)
        return responses.failedWithMessage("this link already exists", res);
    } catch(err) {
        console.log("ERROR--> ", err)
        responses.serverError(res)
    }
}

const getLinks = async (req, res, next) => {
    try {
        const userId = req?.user?.id
        if(!userId) return responses.unauthenticated(res)
        const links = await service.getLinks({userId})
        if(links) return responses.successWithMessage("links get it  successfully", res, transformers.linksTransformer(links))
        return responses.failedWithMessage("filed to get links!", res);
    } catch(err){
        console.log("ERROR--> ", err)
        responses.serverError(res)
    }
}

module.exports = {
    setLink,
    getLinks
}