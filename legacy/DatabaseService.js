const _ = require('lodash');
const DatesService =  require('./../server/services/DatesService');
const constants = require('../app/constants/global');

const admin = require("firebase-admin");
const dbConstants = constants.database;


class DatabaseService {

    init(isProduction) {

        let fireBaseConfig = {};

        if (!isProduction) {
            fireBaseConfig = require('../anigma/memeking-80290-firebase-adminsdk-tvh87-fcd47e07c4.js');

        } else {
            fireBaseConfig = {
                "type": "service_account",
                "project_id": "memeking-80290",
                "private_key_id": JSON.parse(process.env.GOOGLE_KEY_ID),
                "private_key": JSON.parse(process.env.GOOGLE_KEY),
                "client_email": "firebase-adminsdk-tvh87@memeking-80290.iam.gserviceaccount.com",
                "client_id": "105866474084579641723",
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://accounts.google.com/o/oauth2/token",
                "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
                "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-tvh87%40memeking-80290.iam.gserviceaccount.com"
            };
        }

        admin.initializeApp({
            credential: admin.credential.cert(fireBaseConfig),
            databaseURL: "https://memeking-80290.firebaseio.com"
        });

        this.database = admin.database();

    }

    updatePopularMemeRating(meme) {

        if (!_.get(meme, 'id') || !meme) {
            return;
        }

        const currentWeekId = DatesService.getCurrentWeekId();
        const popularTableRef = this.database.ref(dbConstants.weeklyPopularTable);

        // update weekly rating
        popularTableRef.child(currentWeekId).child(meme.id).once('value').then(snapshot => {
            const databaseMeme = snapshot.val();
            let finalMemeObject = {};
            if (databaseMeme) {
                const rating = databaseMeme.rating ? parseInt(databaseMeme.rating) + 1 : 1;
                finalMemeObject = { ...meme, rating };
            } else {
                finalMemeObject = { ...meme, rating : 1 };
            }

            popularTableRef.child(currentWeekId).child(meme.id).set(finalMemeObject);
        })


        //update rating on original meme object
        const specificMemeRef = this.database.ref(`${dbConstants.memesTable}/${meme.category}/${meme.id}`);
        specificMemeRef.once('value').then(snapshot => {
            const databaseMeme = snapshot.val();

            let finalMemeObject = {};
            if (databaseMeme) {
                const rating = databaseMeme.rating ? parseInt(databaseMeme.rating) + 1 : 1;
                finalMemeObject = { ...databaseMeme, rating };
            } else {
                finalMemeObject = { ...meme, rating : 1 };
            }

            specificMemeRef.set(finalMemeObject);
        })

    }

    getWeeklyPopularMemes() {
        const currentWeekId = DatesService.getCurrentWeekId();
        const popularTableRef = this.database.ref(dbConstants.weeklyPopularTable);
        return popularTableRef.child(currentWeekId).once('value')
    }

    async getSearchMemes(query) {
        const lowerCaseQuery = _.toLower(query);
        const data = await this.getAllMemes();

        return _.filter(data, meme => _.includes(_.toLower(meme.description), lowerCaseQuery))
    }

    saveSingleMemeToDataBase(meme) {
        const table = this.database.ref(dbConstants.memesTable);
        table.ref.child(meme.category).child(meme.id).set(meme)
    }

    deleteMeme(meme) {
        const table = this.database.ref(dbConstants.memesTable);
        table.ref.child(meme.category).child(meme.id).remove()

    }

    getCategory(category) {

        return new Promise(resolve => {
            this.database.ref(`/${dbConstants.memesTable}/`).once('value').then(data => {
                resolve(_.get(data.val(), category))
            });


        })
    }

    getAllMemes() {

        return new Promise(resolve => {
            this.database.ref(`/${dbConstants.memesTable}/`).once('value').then(data => {
                let flattenData = []
                _.forEach(data.val(), category => flattenData = [...flattenData, ..._.values(category)])
                resolve(flattenData)
            });


        })
    }

    saveUserMeme(meme) {
        const table = this.database.ref(dbConstants.userSavedMemesTable);
        table.ref.child(meme.id).set(meme);
    }

    saveSuggestedMeme ({ meme }){
        const table = this.database.ref(dbConstants.suggestedMemesTable);
        table.ref.child(meme.id).set(meme);
    }

}


module.exports =  new DatabaseService();