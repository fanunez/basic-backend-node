

const dbValidator = require('./db-validators');
const generateJWT = require('./jwt-generator');
const googleVerify = require('./google-verify');
const uploadFile = require('./upload-file');


module.exports = {
    ...dbValidator,
    ...generateJWT,
    ...googleVerify,
    ...uploadFile
}