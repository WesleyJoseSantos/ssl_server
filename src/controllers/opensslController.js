var openssl = require('openssl-nodejs')
var fs = require('fs');
var errMsg = null;

function opensslCallback(err, buffer) {
    errMsg = err.toString();
    console.log(err.toString(), buffer.toString())
    if(errMsg == "") errMsg = null;
}

exports.getCAkey = function (req, res) {
    openssl(`openssl genrsa -des3 -passout pass:${req.body.pass} -out ca.key 2048`, opensslCallback);
    setTimeout(() => {
        res.status(200).send(errMsg ?? 'CAkey created');
    }, 800);
}

exports.getCAcert = function (req, res) {
    openssl(['req', '-new', '-x509', '-days', `${req.body.days}`, '-passin', `pass:${req.body.pass}`, '-key', 'ca.key', '-out', 'ca.crt', '-subj', `/C=${req.body.country}/ST=${req.body.state}/L=${req.body.locality}/O=${req.body.org}/OU=${req.body.unit}/CN=${req.body.uri}/emailAddress=${req.body.email}`], opensslCallback);
    setTimeout(() => {
        res.status(200).send(errMsg ?? 'CAcert created');
    }, 800);
}

exports.getKey = function (req, res) {
    openssl(`openssl genrsa -out ${req.body.name}.key 2048`, opensslCallback);
    setTimeout(() => {
        res.status(200).send(errMsg ?? `${req.body.name}.key created`);
    }, 800);
}

exports.getCert = function (req, res) {
    openssl(['req', '-new', '-out', `${req.body.name}.csr`, '-key', `${req.body.name}.key`, '-subj', `/C=${req.body.country}/ST=${req.body.state}/L=${req.body.locality}/O=${req.body.org}/OU=${req.body.unit}/CN=${req.body.uri}/emailAddress=${req.body.email}`], opensslCallback);
    setTimeout(() => {
        res.status(200).send(errMsg ?? `${req.body.name}.csr created`);
    }, 800);
}

exports.getSign = function (req, res) {
    openssl(`openssl x509 -req -in ${req.body.name}.csr -CA openssl/ca.crt -CAkey openssl/ca.key -CAcreateserial -out ${req.body.name}.crt -days ${req.body.days} -passin pass:${req.body.pass}`, opensslCallback);
    setTimeout(() => {
        res.status(200).send(errMsg ?? `${req.body.name}.csr signed`);
    }, 800);
}