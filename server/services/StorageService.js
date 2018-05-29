const fs = require('fs')
const recursive = require('recursive-readdir')
const path = require('path')
const _ = require('lodash')
const storage = require('@google-cloud/storage')
const uniqueId = require('../../app/helpers/uniqueId')
const stream = require('stream')

// services
const newDataBaseService = require('../dataBase/DbService');

class StorageService {

    init(isProduction) {
        if (isProduction) {
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

    async uploadNewMemeAndSaveToDataBase(meme) {

        const id = uniqueId();
        const fileName = id;
        const url = `https://storage.googleapis.com/meme-king-storage/memes/${meme.category}/${fileName}.jpg`
        const thumbUrl = `https://storage.googleapis.com/meme-king-storage/meme-thumbs/${meme.category}/${fileName}.jpg`

        await this.uploadToStorage({ image: meme.urlPath, destination: `/memes/${meme.category}/${fileName}.jpg` })
        await this.uploadToStorage({ image: meme.thumbPath, destination: `/meme-thumbs/${meme.category}/${fileName}.jpg` })

        const finalMeme = {
            ...meme,
            urlPath: url,
            id,
            thumbPath: thumbUrl,
            date: new Date()
        }


        newDataBaseService.saveMemeToDataBase({ meme: finalMeme })

        return url;
    }

    uploadToStorage({ image, destination }) {

        return new Promise(resolve => {

            const base64Image = image.split(';base64,').pop()

            const bufferStream = new stream.PassThrough()

            bufferStream.end(new Buffer(base64Image, 'base64'))

            const file = this.myBucket.file(destination)


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
                    console.log(err)
                })
                .on('finish', function (file) {
                    console.log('done save file to storage')
                    // The file upload is complete.
                    resolve();
                })
        })
    }

    async saveUserMeme(meme) {

        const fileName = uniqueId();

        const url = `https://storage.googleapis.com/meme-king-storage/user-generated-memes/${fileName}.jpg`;

        let memeObj = {
            urlPath: url,
            date: new Date().toString(),
            id: fileName,
            description: _.get(meme, 'description'),
            isMobile: meme.isMobile || false,
            isMobileApp: meme.isMobileApp || false,
            isDesktop: meme.isDesktop || false
        }

        const fileData = _.get(meme, 'urlPath');

        await this.uploadToStorage({ image: fileData, destination: `/user-generated-memes/${fileName}.jpg` });
        newDataBaseService.saveUserGeneratedMeme({ meme: memeObj });

        return url

    }

    saveSuggestedMeme({ meme = {} }){
        return new Promise(resolve => {
            const fileName = uniqueId();
            const url = `https://storage.googleapis.com/meme-king-storage/suggested-memes/${fileName}.jpg`;

            if (!_.isString(meme.urlPath)) {
                resolve(`error, urlPath must be a string`);
                return;
            }

            if(!meme.urlPath) {
                resolve(`urlPath must be defined`);
                return;
            }

            this.uploadToStorage({ image: meme.urlPath, destination: `/suggested-memes/${fileName}.jpg` }).then(() => {
                newDataBaseService.saveUserSuggestedMeme({ meme: { ...meme, id: fileName, urlPath: url } }).then(() => {
                    resolve(url);
                })

            })
        })
    }
}

module.exports = new StorageService()


