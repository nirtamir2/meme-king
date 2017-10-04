const fs = require('fs');
const recursive = require('recursive-readdir');
const path = require('path');
const _ = require('lodash');
const storage = require('@google-cloud/storage');
var stream = require('stream');
const axios = require('axios')
// services
const DatabaseService = require('./databaseService');

const gcs = storage({
    projectId: 'memeking-80290',
    keyFilename: './storage.json'
});
function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}
const myBucket = gcs.bucket('meme-king-storage')
class StorageService {

    uploadMemeAndSaveToDataBase(meme) {

       return new Promise(resolve => {
            axios.get(meme.urlPath, {"proxy": {
               "host": "localhost",
               "port": '8081'
           }})
               .then(res => {
                   if(res.error){
                       console.log(error)
                   }
                   console.log('blob')
                   return res.blob()
               })
               .then(blob =>{
                   console.log(blob)
                   resolve()
               })
       })
//         return new Promise((resolve) => {
//             var bufferStream = new stream.PassThrough();
//             bufferStream.end(new Buffer(blob, 'base64'));
//             var file = myBucket.file(`${meme.id}.jpg`);
// //Pipe the 'bufferStream' into a 'file.createWriteStream' method.
//             bufferStream.pipe(file.createWriteStream({
//                 metadata: {
//                     contentType: 'image/jpeg',
//                     metadata: {
//                         custom: 'metadata'
//                     }
//                 },
//                 public: true,
//                 validation: "md5",
//                 destination :'/saved'
//             }))
//                 .on('error', function(err) {
//                     console.log(err)
//                 })
//                 .on('finish', function() {
//                     // The file upload is complete.
//                     resolve();
//                 });
//         })
    }
}

module.exports = new StorageService();


