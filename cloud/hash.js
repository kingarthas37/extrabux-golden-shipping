var crypto = require('crypto');

module.exports = function(signature,userId) {
    var str = userId + '_' + '2015-black-friday';
    var hash = crypto.createHash('sha256').update(str).digest('hex');
    return hash === signature;
};