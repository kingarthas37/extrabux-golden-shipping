var crypto = require('crypto');

module.exports = function(signature,userId,purchaseId) {
    var str = userId + ' ' + purchaseId + ' ' +  'extrabux2015-luck123';
    var hash = crypto.createHash('sha256').update(str).digest('hex');
    return hash === signature;
};