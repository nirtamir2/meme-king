const express = require('express');
const app = express();
const fs = require("fs");
const path = require('path');
const bodyParser = require('body-parser');
const appArgs = require('minimist')(process.argv.slice(2));
const _ = require('lodash');

const NODE_ENVIRONMENT = appArgs.env;
const isProduction = (!(NODE_ENVIRONMENT === 'development'));

// services
const DatabaseService = require('./server/databaseService');
const StorageService = require('./server/StorageService');

// init
DatabaseService.init(isProduction);



// USE

app.use(bodyParser({limit: '50mb'}))

app.use(bodyParser.urlencoded({
    extended: true
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static(__dirname + '/build'));




// HEADERS

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000' );

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});




// GET

app.use(function (req, res, next) {

    const isApiRequest = req.url.match(/\/api\/*/g)
    if (!isApiRequest) {
        res.sendFile(path.join(__dirname + '/build/index.html'  ));
    } else {
        next();
    }

});

app.get('/api/get-weekly-popular-memes', async function (req, res) {
   const data =  await DatabaseService.getWeeklyPopularMemes();
   const topPopularMemes = _.slice(_.reverse(_.sortBy(data.val(), 'rating')), 0 , 48);
   const obj = {};
   _.forEach(topPopularMemes, meme => obj[meme.id] = meme);
   res.send(obj);
});

app.get('/api/search', async function (req, res) {
    const data =  await DatabaseService.getSearchMemes(req.query.search);
    res.send(data)
});




// POST

app.post('/api/update-meme-rating', function (req, res) {
    DatabaseService.updatePopularMemeRating(req.body);
    res.sendStatus(200)
});

app.post('/api/save-new-meme', function (req, res) {
    console.log('before');
    console.log(typeof req.body,  req.body.category)
    StorageService.uploadMemeAndSaveToDataBase(req.body).then(() => {
        console.log('done')
        res.sendStatus(200)

    })
});








// START

app.set( 'port', ( process.env.PORT || 8081 ));

app.listen( app.get( 'port' ), function() {
    console.log( 'Node server is running on port ' + app.get( 'port' ));

});












