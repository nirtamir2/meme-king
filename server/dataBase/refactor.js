const _ = require('lodash');

const oldDataBaseService = require('../services/DatabaseService');
const newDataBaseService = require('./DbService');

newDataBaseService.init({ isProduction: false })
oldDataBaseService.init(false)
const randomCategories = [
     'dank',
    'israeli',
    'pop',
    'parlament',
    'classic',
    'general',
    'eretz_nehederet',
    'tv_abroad',
    'mashups',
    'standup',
    'goalstar',
    'israeli_tv',
     'animals',
    'commercials',
    'asi_guri',
    'media',
    'jews',
]

// save from old category to new database
setTimeout(async function() {

    for (let categoryName in randomCategories) {
        console.log(`category is ${categoryName}`);
        await oldDataBaseService.getCategory(randomCategories[categoryName]).then(async function(memes) {
            const sortedMemes = _.reverse( _.values(memes).sort((a, b) => new Date(b.date) - new Date(a.date)));
            console.log('sorted', _.last(sortedMemes))
            return new Promise(async function(resolve){
                for(let id in sortedMemes) {
                    const currentMeme = sortedMemes[id];
                    await newDataBaseService.saveMemeToDataBase({ meme: { ...currentMeme, date: new Date() } });
                }

                resolve();

                //console.log(`saved - ${_.size(memes)} memes`)
            })
        })
    }



}, 3000);


// get category
// setTimeout(function() {
//     newDataBaseService.getCategory({ category: 'jews' }).then(async function(memes) {
//
//     })
// }, 3000)

// // get popular
// setTimeout(function() {
//     newDataBaseService.getNewMemes().then(async function(memes) {
//
//     })
// }, 3000)

// meme suggestions
// setTimeout(() => {
//     console.log('start suggestions')
//     newDataBaseService.getMemeSuggestions({ category: 'israeli' }).then((res) => {
//         console.log(res);
//     })
// }, 3000)


// get random memes
// setTimeout(() => {
//     newDataBaseService.getRandomMeme().then((res) => {
//         console.log(res);
//     })
// }, 3000)


// save user meme
// setTimeout(() => {
//     newDataBaseService.saveUserGeneratedMeme({ meme:     {
//         description: '',
//         name: 'general/10945516_10152998598403006_8137966637899420689_n copy.jpg',
//         tags: [],
//         id: 'mmz9NLlonjBPIafV',
//         urlPath: 'https://storage.googleapis.com/meme-king-storage/memes%2Fgeneral%2F10945516_10152998598403006_8137966637899420689_n%20copy.jpg',
//         thumbPath: 'https://storage.googleapis.com/meme-king-storage/memes%2Fgeneral%2F10945516_10152998598403006_8137966637899420689_n%20copy.jpg',
//         rating: 3,
//         category: 'general',
//         date: '',
//     }
//     })
// }, 20000)

// get weekly popular memes
// setTimeout(() => {
//     newDataBaseService.getWeeklyPopularMemes().then(res => {
//         console.log(res)
//     })
// }, 2000)


// get search memes
// setTimeout(() => {
//     newDataBaseService.getSearchMemes({description: 'star' }).then(res => {
//         console.log(res)
//     })
// }, 2000)