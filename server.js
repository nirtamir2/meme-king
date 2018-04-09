const express = require('express')
const app = express()
const fs = require("fs")
const path = require('path')
const bodyParser = require('body-parser')
const appArgs = require('minimist')(process.argv.slice(2))
const _ = require('lodash')

const NODE_ENVIRONMENT = appArgs.env
const isProduction = (!(NODE_ENVIRONMENT === 'development'))

// services
const DatabaseService = require('./server/services/DatabaseService')
const StorageService = require('./server/services/StorageService')

// init
DatabaseService.init(isProduction);
StorageService.init(isProduction);

// helpers
const helpers = require('./server/helpers/helpers');




// USE

app.use(bodyParser({ limit: '50mb' }))

app.use(bodyParser.urlencoded({
    extended: true
}))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static(__dirname + '/build'))


// HEADERS

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*')

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true)

    // Pass to next layer of middleware
    next()
})


// GET

app.use(function (req, res, next) {

    const isApiRequest = req.url.match(/\/api\/*/g);

    if (!isApiRequest) {
        res.sendFile(path.join(__dirname + '/build/index.html'));
    } else {
        next();
    }

})

app.get('/api/get-weekly-popular-memes', async function (req, res) {
    const data = await DatabaseService.getWeeklyPopularMemes()
    const topPopularMemes = _.slice(_.reverse(_.sortBy(data.val(), 'rating')), 0, 64)
    res.send(helpers.arrayToObjById(topPopularMemes))
})

app.get('/api/search', async function (req, res) {
    const data = await DatabaseService.getSearchMemes(req.query.search);
    res.send(data)
})

app.get('/api/all-time-popular-memes', async function (req, res) {
    const data = await DatabaseService.getAllMemes();
    const sortedData = _.slice(data.sort((a, b) => b.rating - a.rating), 0, 72);
    res.send(helpers.arrayToObjById(sortedData))
})

app.get('/api/new-memes', async function (req, res) {
    const data = await DatabaseService.getAllMemes();
    const filteredData = _.values(data).filter(meme => meme.date);
    const sortedData = _.slice(filteredData.sort((a, b) => new Date(b.date) - new Date( a.date)), 0, 72)
    res.send(helpers.arrayToObjById(sortedData))
});

app.get('/api/meme-suggestions', async function (req, res) {
    const data = await DatabaseService.getCategory(req.query.category);
    const response = {
        category: req.query.category,
        memes: helpers.arrayToObjById(_.sampleSize(data, req.query.size))
    }
    res.send(response);

});

app.get('/api/random-meme', async function (req, res) {

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

    const randomCategoryIndex = Math.floor(Math.random() * ((_.size(randomCategories) - 1 )  + 1));
    const data = await DatabaseService.getCategory(randomCategories[randomCategoryIndex]);
    const randomMemeIndex = Math.floor(Math.random() * ((_.size(data) - 1 )  + 1));
    const randomMeme = _.values(data)[randomMemeIndex];

    const response = {
        randomMeme
    }

    res.send(response);

});


// POST

app.post('/api/update-meme-rating', function (req, res) {
    DatabaseService.updatePopularMemeRating(req.body)
    res.sendStatus(200)
})

app.post('/api/save-new-meme', function (req, res) {
    console.log('before saving new meme')
    StorageService.uploadNewMemeAndSaveToDataBase(req.body).then((result) => {
        res.sendStatus(200)

    })
})

app.post('/api/edit-meme', function (req, res) {
    DatabaseService.saveSingleMemeToDataBase(req.body)
    res.sendStatus(200)
})

app.post('/api/delete-meme', function (req, res) {
    DatabaseService.deleteMeme(req.body)
    res.sendStatus(200)
})

app.post('/api/save-user-meme', function (req, res) {
    console.log(_.keys(req.body))
    StorageService.saveUserMeme(req.body, true)
    res.sendStatus(200)
});

app.post('/api/upload-suggested-new-meme', function (req, res) {
    console.log('save suggested meme');
    StorageService.saveSuggestedMeme(req.body).then(url => {
        res.status(200);
        res.send(url);
    });
});




// START

app.set('port', ( process.env.PORT || 8081 ))

app.listen(app.get('port'), function () {
    console.log('Node server is running on port ' + app.get('port'))

})












