const _ = require('lodash');
const DatesService =  require('./DatesService');
const constants = require('../app/constants/global');

const admin = require("firebase-admin");
const serviceAccount = require("../memeking-80290-firebase-adminsdk-tvh87-fcd47e07c4.js");

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


export default new DatabaseService();