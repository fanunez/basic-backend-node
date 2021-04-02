
const { Resolver } = require('dns');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = ( files, validExtension = ['png', 'jpg', 'jpeg', 'gif'], folder = '' ) => {

    return new Promise (( resolve, reject ) => {

        const { file } = files;
        const name = file.name.split('.');
        const ext = name[ name.length - 1 ];
        
        // Validar extension
        if( !validExtension.includes( ext ) ) {
            return reject(`La extension ${ ext } no es permitida. Por favor utilizar: ${ validExtension }`);
        }
        
        const tempName = uuidv4() + '.' + ext;
        const uploadPath = path.join(__dirname, '../uploads/', folder, tempName );
        
        file.mv( uploadPath, (err) => {
            if (err) {
                reject( err );
            }
          
        //   resolve( 'File uploaded to ' + uploadPath );
            resolve( tempName );
        });

    });

}


module.exports = {
    uploadFile
}