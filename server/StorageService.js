const fs = require('fs')
const recursive = require('recursive-readdir')
const path = require('path')
const _ = require('lodash')
const storage = require('@google-cloud/storage');
const uniqueId = require('../app/helpers/uniqueId');
var stream = require('stream');

// services
const DatabaseService = require('./DatabaseService');

class StorageService {

    init(isProduction) {
        if(isProduction) {
            this.gcs = storage({
                credentials: {
                    "type": "service_account",
                    "project_id": "memeking-80290",
                    "private_key_id": "a2d02c0f317a9cceff4dd2abbaf2110db0ecbdbc",
                    "private_key": JSON.parse(process.env.GOOGLE_STORAGE_KEY),
                    "client_email": "storager@memeking-80290.iam.gserviceaccount.com",
                    "client_id": "111504596396275984699",
                    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                    "token_uri": "https://accounts.google.com/o/oauth2/token",
                    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
                    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/storager%40memeking-80290.iam.gserviceaccount.com"
                }

            })
        } else {
            this.gcs = storage({
                projectId: 'memeking-80290',
                keyFilename: './anigma/storage.json'
            })
        }

        this.myBucket = this.gcs.bucket('meme-king-storage')

    }

    async uploadMemeAndSaveToDataBase(meme) {

        const fileName = meme.id;
        const url = `https://storage.googleapis.com/meme-king-storage/memes/${meme.category}/${fileName}.jpg`
        const thumbUrl = `https://storage.googleapis.com/meme-king-storage/meme-thumbs/${meme.category}/${fileName}.jpg`

        await this.uploadToStorage(meme.urlPath,  meme.id, meme.category, 'memes')
        await this.uploadToStorage(meme.thumbPath,  meme.id, meme.category, 'meme-thumbs')

        const finalMeme = {
            ...meme,
            urlPath: url,
            thumbPath: thumbUrl
        };

        DatabaseService.saveSingleMemeToDataBase(finalMeme);
        console.log(finalMeme, 'final meme');
    }

    uploadToStorage(image, fileName, category, type) {
        return new Promise(resolve => {
            const base64Image = image.split(';base64,').pop()
            const bufferStream = new stream.PassThrough()
            bufferStream.end(new Buffer(base64Image, 'base64'))

            const isUserSavedMemeCase = !category;


            let file ;
            if (isUserSavedMemeCase) {
                file = this.myBucket.file(`/${type}/${fileName}.jpg`)
            } else {
                file = this.myBucket.file(`/${type}/${category}/${fileName}.jpg`);
            }

            console.log(isUserSavedMemeCase)



            bufferStream.pipe(file.createWriteStream({
                metadata: {
                    contentType: 'image/jpeg',
                    metadata: {
                        custom: 'metadata'
                    }
                },
                public: true,
                validation: "md5"
            }))
                .on('error', function (err) {
                })
                .on('finish', function () {
                    // The file upload is complete.
                    resolve()
                    console.log('new meme upload complete')
                })
        })
    }

    async saveUserMeme(meme, includeDeviceData) {
        const fileName = uniqueId();
        const url = `https://storage.googleapis.com/meme-king-storage/user-memes/${fileName}.jpg`;
        let memeObj = {
            urlPath : url,
            date: new Date().toString(),
            id: fileName,
        }

        if(includeDeviceData) {
            memeObj = {
                ...memeObj,
                isMobile: meme.isMobile || '',
                isMobileApp: meme.isMobileApp || ''
            }
        }

        console.log(memeObj)
        const fileData = _.get(meme , 'urlPath');

        await this.uploadToStorage(fileData, fileName, null, 'user-memes');

        DatabaseService.saveUserMeme(memeObj);
        console.log('saved user meme')
    }
}

module.exports = new StorageService()


