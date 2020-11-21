/**
 * Scanner Model
 * @description Scan the given url then produce the vulnerability report
 * @version 1.0.0
 * @author Joseph
 * created on 01/03/2019
 */

/**
 * Require modules
 */
var async = require('async');
var ZapClient = require('zaproxy');
// ----------------------------------------------------------------------------

/**
 * Require files
 */

// ----------------------------------------------------------------------------

/**
 * Variable declaration
 */
// ----------------------------------------------------------------------------
/**
 * @method scanUrl
 * @description Scan the given url
 * Scan and find the vulnerabilities of webapplication
 * @param {*} url 
 * @param {*} maxChildren 
 * @param {*} recurse 
 * @param {*} contextName 
 * @param {*} subtreeOnly
 * @param {*} callback 
 */
exports.scanUrl = function (
    url,
    maxChildren,
    recurse,
    contextName,
    subtreeOnly,
    callback
) {
    // Initialization of parameters
    // let url1 = url;
    // let maxChildren1 = maxChildren;
    // let recurse1 = recurse;
    // let contextName1 = contextName;
    // let subtreeOnly1 = subtreeOnly;

    // configuration of api key and proxy
    const zapOptions = {
        apiKey: 'bf6vn8qth52ct17ehjh70esbl8',
        proxy: 'http://localhost:8080'
    };

    //Client creation    
    const zaproxy = new ZapClient(zapOptions);
    

    async.waterfall([
        function (callback) {
            /**
             * Spider the url
             */
            zaproxy.spider.scan(url, maxChildren, recurse, contextName, subtreeOnly, (err, resp) => {
                // All errors are handled here
                console.log("In spider scan")
                if (err) {
                    console.info('Error:', err);
                    let error = { statusCode: 422, error: err };
                    callback(error);
                }
                // All valid responses are handled here
                if (resp) {
                    console.info('Response:', resp);
                    let result = resp.scan;
                    callback(null, result);
                }
            });
        },
        function (scanId, callback) {
            console.info('Scan id from spider:', scanId);
            /**
             * Scan the url
             */
            let inScopeOnly = false;
            let scanPolicyName = null;
            let method = 'GET';
            let postData = true;

            zaproxy.ascan.scan(url, recurse, inScopeOnly, scanPolicyName, method, postData, '', (err, resp) => {
                // All errors are handled here
                if (err) {
                    console.info('Error:', err);
                    let error = { statusCode: 422, error: err };
                    callback(error);
                }
                // All valid responses are handled here
                if (resp) {
                    console.info('Ascan Response:', resp);
                    zaproxy.ascan.stop(resp.scan);
                    console.log('**8888888');
                    let result = resp;
                    callback(null, result);
                }
            });

        },
        function (ascanId, callback) {
            console.info('Scan id from ascan:', ascanId);
            /* 
             Scan the url
            */
            zaproxy.core.jsonreport((err, resp) => {
                //zaproxy.core.jsonreport((err, resp) => {
                //  All errors are handled here
                if (err) {
                    console.info('Error:', err);
                    let error = { statusCode: 422, error: err };
                    callback(error);
                }
                // All valid responses are handled here
                if (resp) {
                    console.info('Json Response:', resp);
                    let result = resp;
                    callback(null, result);
                }
            });

        }
    ], function (err, result) {
        callback(err, result);
    });
}

// ----------------------------------------------------------------------------