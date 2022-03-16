const xml2js = require('xml2js');
const axios = require('axios');
const {HttpError} = require("../Exceptions/httpError");

class HttpClient {

    async soapReq(data, url, action = null, method = 'post', headers = null) {
        try {
            if (!headers) headers = {
                'Content-Type': 'text/xml; charset=utf-8',
                "SOAPAction": `"${action}"`
            }
            let result = await this.httpReq(data, url, method, headers);
            return await this.soapToObj(result);
        } catch (e) {
            throw new HttpError(e.code, e.message);
        }
    }

    async httpReq(data, url, method, headers) {
        const config = {method, url, headers, data};
        try {
            const result = await axios(config);
            return result.data;
        } catch (e) {
            throw new HttpError(e.code, e.message);
        }
    }

    async soapToObj(body) {
        const parseString = xml2js.parseString;
        const stripNS = xml2js.processors.stripPrefix;
        return await new Promise((resolve, reject) => {
            parseString(body, {tagNameProcessors: [stripNS], explicitArray: false}, function (err, result) {
                if (err) reject(err);
                else resolve(result);
            })
        });
    }
}


module.exports = {
    HttpClient: HttpClient,
    httpClient: new HttpClient(),
};