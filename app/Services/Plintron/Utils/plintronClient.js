const fs = require("fs");
const ejs = require('ejs');
const {HttpClient} = require("../../../Utils/httpClient");
const {HttpError} = require("../../../Exceptions/httpError");
const {PlintronError} = require("../../../Exceptions/plintronError");
const {plintron} = require("../../../../config/index.config");
const {plintronLogger} = require("../../../Utils/logger");
const {v4} = require("uuid");

class PlintronClient extends HttpClient {

    constructor() {
        super();
        this.is_loging = true;
    }

    async req(data, action, template = null) {
        try {
            const headers = {
                'Content-Type': 'text/xml; charset=utf-8',
                "SOAPAction": `"${action}"`
            }

            if (!data.entity) data.entity = plintron.entity;
            if (!data.transaction_id) data.transaction_id = v4().substring(0, 12);
            data = await this.objToSoap(data, template || action);
            if (this.is_loging) plintronLogger.req(await this.soapToObj(data));
            plintronLogger.res(plintron.url);
            const result = await this.soapReq(data, plintron.url, null, 'post', headers);
            if (this.is_loging) plintronLogger.res(result);
            this.errorHandler(result);
            return this.getRes(result);
        } catch (e) {
            throw new HttpError(e.code, e.message);
        }
    }

    getRes(data) {
        let res = data?.Envelope?.Body;
        if (!res) throw new HttpError(15003, 'Req failed');
        const json = JSON.stringify(res);
        let newJson = json.replace(/"([\w]+)":/g, function ($0, $1) {
            return ('"' + $1.toLowerCase() + '":');
        });
        return JSON.parse(newJson);
    }

    errorHandler(result) {
        if (result?.Envelope?.Header?.ERROR_CODE) {
            const code = Number(result.Envelope.Header.ERROR_CODE);
            if (code !== 0) {
                plintronLogger.error(result.Envelope.Header);
                throw new HttpError(code, result.Envelope.Header.ERROR_DESC);
            }
            return true;
        }
        throw new HttpError(15001, 'Req failed');
    }

    async objToSoap(data, template) {
        try {
            template = fs.readFileSync(`./app/Services/Plintron/ReqConstructor/${template}.ejs`, 'utf-8');
            return ejs.render(template, data);
        } catch (e) {
            throw new PlintronError(15002, e.message);
        }
    }

}


module.exports = {
    PlintronClient: new PlintronClient()
};