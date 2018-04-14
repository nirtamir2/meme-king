const _ = require('lodash');
const mongoose = require('mongoose');

// schemas
const schemas = require('./Schemas/schemas');
const { memeSchema, userGeneratedMemeSchema, weeklyMemeSchema, suggestedMemeSchema, userReportSchema } = schemas;

// helpers
const uniqueId = require('../../app/helpers/uniqueId');
const helpers = require('../helpers/helpers');

// services
const DatesService = require('../services/DatesService');

// models
const Meme = mongoose.model('Meme', memeSchema)
const UserGeneratedMeme = mongoose.model('UserGeneratedMeme', userGeneratedMemeSchema);
const WeeklyMeme = mongoose.model('WeeklyMeme', weeklyMemeSchema);
const SuggestedMeme = mongoose.model('SuggestedMeme', suggestedMemeSchema);
const UserReport = mongoose.model('UserReport', userReportSchema);


let db;

const init = ({ isProduction }) => {

    let dbPath;

    if (!isProduction) {
        const dbConstants = require('../../anigma/dbConstants');
        dbPath = dbConstants.testDatabasePath;
    }

    const database = (

        isProduction
            ?
        JSON.parse(process.env.MONGO_PATH)
            :
        dbPath
    );


    mongoose.connect(database)

    db = mongoose.connection

    db.on('error', console.error.bind(console, 'connection error:'))


    db.once('open', function () {

        console.log('Database Connected!')
    })
}

const saveMemeToDataBase = ({ meme } = {}) => {
    return new Promise(resolve => {

        const newMeme = new Meme(meme)
        newMeme.save(function (err, res) {

            if (err) return console.error(err)

            console.log(`saved meme to database - ${meme.id}`)

            resolve(res)
        })
    })
}

const getCategory = ({ category } = {}) => {
    return new Promise(resolve => {
        Meme.find({ category }).sort('-date').exec(function (err, res) {
            console.log(category, 'category fetched')
            resolve(helpers.arrayToObjById(res))
        })
    })
}

const getPopularMemes = () => {
    return new Promise(resolve => {
        Meme.find({}).sort('-rating').limit(48).exec(function (err, memes) {
            console.log(`popular memes fetched`, _.size(memes))
            resolve(helpers.arrayToObjById(memes))
        })

    })
}

const getNewMemes = () => {
    return new Promise(resolve => {
        Meme.find({}).sort('-date').limit(48).exec(function (err, memes) {
            console.log(`new memes memes fetched`, _.size(memes))
            resolve(helpers.arrayToObjById(memes))
        })

    })
}

const incrementMemeRating = ({ meme = {} } = {}) => {

    return new Promise(resolve => {

        if (!meme.id) {
            resolve()
            return
        }

        Meme.findOneAndUpdate({ id: meme.id }, { $inc: { 'rating': 1 } }).exec(function (err, meme) {
            console.log('increment rating meme: ', _.get(meme, 'description'), _.get(meme, 'rating'))
        })

        const week = helpers.getWeekNumber()

        WeeklyMeme.findOneAndUpdate({ id: meme.id, week }, { $inc: { 'rating': 1 } }).exec(function (err, res) {

            WeeklyMeme.remove({ week: week - 1 })

            if (!res) {

                const newMeme = new WeeklyMeme({ ...meme, rating: 1, week })

                newMeme.save(function (err, weeklyRes) {

                    console.log('increment weekly Meme', _.get(weeklyRes, 'description'), _.get(weeklyRes, 'rating'))
                    resolve(weeklyRes)

                })

            } else {
                console.log('saved new weekly Meme', _.get(res, 'description'), _.get(res, 'rating'))
                resolve(res)
            }


        })
    })
}

const getMemeSuggestions = ({ category, amount = 6 } = {}) => {

    return new Promise(resolve => {
        const promises = []

        _.times(amount, () => {
            promises.push(new Promise(async function (resolve) {
                Meme.count({ category: 'dank' }, function (err, count) {

                    const random = Math.floor(Math.random() * count)

                    db.collections.memes.find({ category }).limit(-1).skip(random).next(function (err, result) {
                        resolve(result)
                    })
                })
            }))
        })


        return Promise.all(promises).then(suggestions => {
            console.log(`got suggestions`, _.size(suggestions))
            resolve(helpers.arrayToObjById(suggestions))
        })
    })
}


const getRandomMeme = () => {

    return new Promise(resolve => {

        Meme.count(function (err, count) {

            const random = Math.floor(Math.random() * count)

            db.collections.memes.find().limit(-1).skip(random).next(function (err, result) {
                resolve(result)
            })
        })

    })
}

const deleteMeme = ({ meme = {}, id } = {}) => {
    return new Promise(resolve => {
        Meme.remove({ id: meme.id || id }, function (err) {

            if (!err) {
                resolve()
            }

        })
    })
}

const saveUserGeneratedMeme = ({ meme = {} } = {}) => {

    return new Promise(resolve => {

        const newMeme = new UserGeneratedMeme({ ...meme, id: meme.id || uniqueId() })

        newMeme.save(function (err, res) {
            if (err) return console.error(err)
            console.log(`saved user generated meme - ${meme.id}`)
            resolve(res)
        })
    })
}

const getUserGeneratedMemes = () => {

    return new Promise(resolve => {


        UserGeneratedMeme.find({}, function (err, memes) {
            if (err) return console.error(err)
            console.log(`got user generated memes`, _.size(memes))
            resolve(memes)
        })
    })
}

const removeUserGeneratedMemes = () => {
    UserGeneratedMeme.collection.drop()
}

const getWeeklyPopularMemes = () => {

    return new Promise(resolve => {

        const week = helpers.getWeekNumber()

        WeeklyMeme.find({ week }).limit(48).sort('-rating').exec(function (err, res) {
            console.log('weekly popular memes', _.size(res))
            resolve(helpers.arrayToObjById(res))
        })
    })
}

const getSearchMemes = ({ description } = {}) => {
    return new Promise(resolve => {
        Meme.find({ description: new RegExp(description, "i") }, function (err, memes) {
            console.log('searched memes', _.size(memes))
            resolve(helpers.arrayToObjById(memes))
        })
    })
}

const saveUserSuggestedMeme = ({ meme } = {}) => {
    return new Promise(resolve => {
        const newMeme = new SuggestedMeme(meme)
        saveUserSuggestedMeme.save(newMeme, function (err, res) {
            resolve(res)
        })
    })
}

const getUserSuggestedMemes = () => {
    return new Promise(resolve => {
        SuggestedMeme.find({}, function (err, res) {
            console.log(_.size(res), 'user suggested memes fetched')
            resolve(res)
        })
    })
}

const saveUserReport = ({ report }) => {
    return new Promise(resolve => {

        const newReport = new UserReport(report)

        newReport.save(function (err, res) {

            if (err) return console.error(err)

            console.log(`saved user report`)

            resolve(res)
        })
    })
}

const getUserReports = () => {
    return new Promise(resolve => {
        UserReport.find({}).exec(function (err, res) {
            console.log('user reports fetched', _.size(res))
            resolve(res)
        })
    })
}

const updateUserReportLikes = ({ report = {} } = {}) => {
    return new Promise(resolve => {
        UserReport.findOneAndUpdate({ id: report.id }, { $inc: { 'likes': 1 } }, { new: 'true' }).exec(function (err, report = {}) {
            console.log('increment user report likes meme: ' + report)
            resolve(report)
        })
    })
}

const getSingleMeme = ({ id } = {}) => {
    return new Promise(resolve => {
        Meme.find({ id }, function (err, meme) {
            resolve(meme)
        })
    })
}

const updateMeme = ({ meme = {} } = {}) => {
    return new Promise(resolve => {
        Meme.findOneAndUpdate({ id: meme.id }, meme, { upsert: true }, function (err, doc) {
            if (err) resolve(err)
            return resolve("succesfully updated meme")
        })
    })
}

const get = {
    getCategory,
    getPopularMemes,
    getNewMemes,
    getMemeSuggestions,
    getRandomMeme,
    getWeeklyPopularMemes,
    getSearchMemes,
    getUserSuggestedMemes,
    getSingleMeme,
    getUserGeneratedMemes,
    getUserReports,
}

const put = {
    updateMeme,
    updateUserReportLikes,

}

const post = {
    saveMemeToDataBase,
    incrementMemeRating,
    saveUserSuggestedMeme,
    deleteMeme,
    saveUserGeneratedMeme,
    saveUserReport,
    removeUserGeneratedMemes,
}


const DbService = {
    init,
    ...put,
    ...get,
    ...post
}


module.exports = DbService