class PlintronError extends Error {
    constructor(code, message = '', ...params) {
        super(params)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, PlintronError)
        }
        this.code = code
        this.message = message
        this.date = new Date()
        this.type = "plintron"
    }
}

function errCheckerPlintron(condition,message) {
    if (condition)
        throw new Error(message);
}


module.exports = {
    PlintronError: PlintronError,
    errCheckerPlintron:errCheckerPlintron
};