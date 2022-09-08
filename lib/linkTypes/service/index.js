const models = require("../../../models")
const  sequelize = require("sequelize")


const getLinkTypes = async ({}) =>{
    try {
        const linkTypes = await models.LinkType.findAll({
            where:{
                deletedAt: null
            }
        })
        return linkTypes
    }catch(err){
        throw new Error(err)
    }
}

const setLinkType = async ({linkType: name}) =>{
    try {
        const linkType = await models.LinkType.findOrCreate({
            where:{
                name,
                icon: "https://firebasestorage.googleapis.com/v0/b/linktree-a8b23.appspot.com/o/deafult%20link%20Type.jpeg?alt=media&token=0e91e3f4-342a-4e4d-a387-a6a9ece4ae85"
            }
        })
        return linkType
    }catch(err){
        throw new Error(err)
    }
}

const deleteLinkType = async ({id}) =>{
    try {
        const linkType = await models.LinkType.update({
              deletedAt: sequelize.fn("now")
        },
        {
            where: {
                [sequelize.Op.and]: [{id},{ deletedAt: {[sequelize.Op.eq]: null}}]
            }
        }
        )
        return linkType
    }catch(err){
        throw new Error(err)
    }
}


module.exports = {
    getLinkTypes,
    setLinkType,
    deleteLinkType
}