const {responses} = require("../../helper")
const service = require("../service")
const models = require("../../../models")
const sequelize = require("sequelize")
const transformers = require("../../transformers")
var QRCode = require('qrcode')


const generateQR = async (req, res, next) => {
    try {
        const username = req?.user?.username
        if(!username) return responses.unauthenticated(res)
        const qr = await QRCode.toDataURL(username)
        if(qr) return responses.successWithMessage("qr has been created !",res, {qr})
        return responses.failedWithMessage("failed to create qr !",res)
    } catch(err){
        console.log("ERROR-->: ", err)
        return responses.serverError(err)
    }
}



module.exports = {
    generateQR,
}