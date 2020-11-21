var ZapClient = require('zaproxy');
const scan = require('./scanner')

const zapOptions = {
    apiKey: 'bf6vn8qth52ct17ehjh70esbl8',
    proxy: 'http://localhost:8080'
};

const zaproxy = new ZapClient(zapOptions);
zaproxy.core
exports.createContext = function (req, res, contextName, targetUrl) {

    zaproxy.context.newContext(contextName, () => {

        console.log("Contex Created")
        zaproxy.context.includeInContext(contextName, targetUrl, () => {

            console.log("Regex in context " + contextName)
            scan.scanUrl(req, res)
        })
    })
}

exports.removeContext = function (contextName) {

    zaproxy.context.removeContext(contextName, () => {

        console.log("Context Removed")
    })
}