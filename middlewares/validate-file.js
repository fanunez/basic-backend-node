
const { response } = require("express")


const validateFile = (req, res = response, next) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        res.status(400).send({
            msg: 'No hay archivo que subir'
        });
        return;
      }

      next();

}

module.exports = {
    validateFile
}