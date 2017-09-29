const _ = require('lodash');
const DatesService =  require('./DatesService');
const constants = require('../app/constants/global');

const admin = require("firebase-admin");

const serviceAccount = {
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

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://memeking-80290.firebaseio.com"
});

const dbConstants = constants.database;

const database = admin.database();

class DatabaseService {

    updatePopularMemeRating(meme) {

        const currentWeekId = DatesService.getCurrentWeekId();
        const popularTableRef = database.ref(dbConstants.weeklyPopularTable);

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
        const specificMemeRef = database.ref(`${dbConstants.memesTable}/${meme.category}/${meme.id}`);
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
        const popularTableRef = database.ref(dbConstants.weeklyPopularTable);
        return popularTableRef.child(currentWeekId).once('value')
    }

    async getSearchMemes(query) {
        const data = await this.getAllMemes();
        const allMemesByCategories =  data.val();
        let flattenAllMemesByCategories = {};
       _.forEach(allMemesByCategories , category => flattenAllMemesByCategories = {...flattenAllMemesByCategories, ...category });

        return _.filter(flattenAllMemesByCategories, meme => _.includes(meme.description, query))
    }

    getAllMemes() {
        return database.ref(`/${dbConstants.memesTable}/`).once('value');
    }

}


module.exports =  new DatabaseService();