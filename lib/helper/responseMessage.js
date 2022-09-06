exports.successResponse = function(messages = '', data = [], extras = {}) {
    var response = {
        success: true,
        messages,
        data ,
        time: Date.now(),
    }
    response = {...response, ...extras}
    return response
}

exports.errorResponse = function(messages = '', data = []) {
    var response = {
        success: false,
        messages, 
        data,
        time: Date.now()
    }
    return response
}