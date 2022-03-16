class HttpError extends Error {
    constructor(code, message = '', ...params) {
        super(params)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, HttpError)
        }
        this.code = code
        this.message = message
        this.date = new Date()
    }
}


module.exports = {
    HttpError: HttpError
};