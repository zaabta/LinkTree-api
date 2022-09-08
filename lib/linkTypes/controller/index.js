const { responses } = require("../../helper")
const service = require("../service")
const transformers = require("../../transformers")


const getLinkTypes = async (req, res, next) => {
    try {
        const linkTypes = await service.getLinkTypes({})
        if(linkTypes) return responses.successWithMessage("",res,transformers.linkTypesTransformer(linkTypes))
        return responses.failedWithMessage("Failed To get The Link Types",res)
    } catch(err){
        console.log("ERROR-->", err)
        return responses.serverError(res)
    }
}

const setLinkType = async (req, res, next) => {
    try {
        const { linkType } = req?.body
        if(!linkType) return responses.failedWithMessage("link type empty!", res)
        const linkTypeResult = await service.setLinkType({linkType})
        if(linkTypeResult) return responses.successWithMessage("link type has been added !", res)
        return responses.failedWithMessage("failed to add link type!",res)
    } catch(err){
        console.log("ERROR-->", err)
        return responses.serverError(res)
    }
}


const deleteLinkType = async (req, res, next) => {
    try {
        const { id } = req.params
        if(!id) return responses.failedWithMessage("link type Id is empty!", res)
        const linkTypeResult = await service.deleteLinkType({id})
        if(linkTypeResult?.length > 0 && linkTypeResult[0]) return responses.successWithMessage("link type has been deleted !", res)
        return responses.failedWithMessage("failed to delete link type!",res)
    } catch(err){
        console.log("ERROR-->", err)
        return responses.serverError(res)
    }
}




module.exports = {
    getLinkTypes,
    setLinkType,
    deleteLinkType
}