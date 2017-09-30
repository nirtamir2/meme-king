/**
 * Created by nirbenya on 08/06/2017.
 */
const fs = require('fs');
const recursive = require('recursive-readdir');
const path = require('path');
const _ = require('lodash');
const appArgs = require('minimist')(process.argv.slice(2));
console.log(appArgs)
console.log(appArgs.type);
let wantedSize = 0;

const storage = require('@google-cloud/storage');

const gcs = storage({
    projectId: 'memeking-80290',
    keyFilename: './storage.json'
});

const myBucket = gcs.bucket('meme-king-storage')
let toggle = true;

const type = appArgs.type;
const isThumb = type ==='meme-thumbs';

let size = 0;
 function saveFileToStorage (filePath, destinationFolder, memeObj) {
    if(true) {
//        console.log(filePath, destinationFolder)

        //console.log(destinationFolder)
        myBucket.upload(filePath, { public: true, destination: `${type}/${destinationFolder}/${filePath.replace(`./${type}/${destinationFolder}/`, '')}`, validation: true })
            .then( data => {
                // file saved
                fs.exists(filePath, function( exists ) {
                    if(!exists) {
                        return;
                    }
                });
                let file = data[0]
                file.getSignedUrl({
                    action: 'read',
                    expires: '03-17-2025',

                }, function(err, url) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    //console.log(url)
                    console.log(size, 'saved file' , wantedSize);
                    size++;
                    writeToDataBase(memeObj,destinationFolder, url)
                })
            })
        toggle = false;
    }
}

// // Create a new bucket.
// gcs.createBucket('kkjhlkjhk', function(err, bucket) {
//     if (!err) {
//       console.log('new bucket create')
//     }
//     console.log(err)
// });
//






    const admin = require("firebase-admin");
    const serviceAccount = require("./memeking-80290-firebase-adminsdk-tvh87-fcd47e07c4.js");


    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://memeking-80290.firebaseio.com"
    });

    const database = admin.database();

    var ref = database.ref(type === 'memes' ? "memesDataTable" : "memesIdsTable");
    const handleMemes = (snapshot) => {
        const data =snapshot.val();
        _.forEach(_.keys(data), category => {
            _.forEach(isThumb ? data[category] : data[category].memes , (memeObj) => {
               if( category === appArgs.category){

                   wantedSize = isThumb ? _.size(data[category]) : _.size(data[category].memes);

                   if(memeObj.name && !memeObj.name.includes('DS_Store')) {
                       const fullPath = `./${type}/${memeObj.name}`;
                        saveFileToStorage(fullPath, category, memeObj)
                   }
               }
            })
        })
       // _.keys(data, category => console.log(category));

    }



function makeId() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 16; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

// Attach an asynchronous callback to read the data at our posts reference
    ref.on("value", handleMemes, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });


    const writeToDataBase = (memeObject,category, urlPath) => {
        const id = isThumb ? memeObject.id : makeId();

        const createUrl = url => {
            if(url && url.includes('.png')) {
                return url.split('.png')[0] + '.png'
            }
            else {
                return url.split('.jpg')[0] + '.jpg'

            }
        }
        const memeObj = {
            ...memeObject,
            id : id,
            category: category,
            urlPath: isThumb ? memeObject.urlPath : createUrl(urlPath),
            thumbPath: createUrl(urlPath)
        }
        if(isThumb) {
            delete memeObj.name;
        }
        database.ref( `try/${category}/${id}`).set(memeObj)
    }



