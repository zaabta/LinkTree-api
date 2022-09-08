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
                [sequelize.Op.and]: [{userId}, {deletedAt: {[sequelize.Op.eq]: null} }]
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
        return responses.serverError(res)
    }
}


const getLink = async (req, res, next) => {
    try {
        const {id} = req.params
        if(!id) return responses.failedWithMessage("Empty link id", res)
        const userId = req?.user?.id
        if(!userId) return responses.unauthenticated(res)
        const link = await service.getLink({id, userId})
        if(link) return responses.successWithMessage("Link is valid", res, transformers.linkTransformer(link))
        return responses.failedWithMessage("Link is invalid", res)
    } catch(err){
        console.log("ERROR--> ", err)
        return responses.serverError(res)
    }
}

const editLink = async (req, res, next) => {
    try {
        const {id} = req?.params
        const {url, linkTypeId} = req?.body
        if(!url || !linkTypeId)  return responses.failedWithMessage("please Enter link info!", res)
        const userId = req?.user?.id
        if(!userId) return responses.unauthenticated(res)
        const links = await service.getLinks({userId})
        const ok = links?.find(link => link.url == url && link?.LinkType.id == linkTypeId)
        if(!ok){
            const link = await service.editLink({userId, id, url, linkTypeId})
            if(link?.lenght > 0 && link[0]) return responses.successWithMessage("Link has been updated !",res)

        }
        return responses.failedWithMessage("this link already exists!",res)
    } catch(err) {
        console.log("ERROR--> ", err)
        return responses.serverError(res)
    }
}

const deleteLink = async (req, res, next) => {
    try {
        const {id} = req?.params
        const userId = req?.user?.id
        if(!userId) return responses.unauthenticated(res)
        if(await service.getLink({userId, id})){
            const link = await service.deleteLink({userId, id})
            if(link?.length > 0 && link[0]) 
                return responses.successWithMessage("Link has been deleted !",res)
        }
        return responses.failedWithMessage("Failed to delete !",res)
    } catch(err) {
        console.log("ERROR--> ", err)
        return responses.serverError(res)
    } 
}


module.exports = {
    setLink,
    getLinks,
    getLink,
    editLink,
    deleteLink
}