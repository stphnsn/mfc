var express = require('express'),
    exphbs = require('express-handlebars'),
    bodyParser = require('body-parser'),
    http = require('http'),
    basicAuth = require('basic-auth'),
    dataProvider = require('./modules/dataProvider'),
    df = require('./modules/dateFormatter'),
    calendar = require('./modules/calendar'),
    app = express(),
    htmlHeaders = {
        'Content-Type': 'text/html; charset=UTF-8'
    },
    URL = process.env.URL || 'http://localhost:3002';

dataProvider.connect();

var auth = function (req, res, next) {
    var user = basicAuth(req);
    if (!user || !user.name || !user.pass) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        res.sendStatus(401);
        return;
    }
    if (user.name === 'admin' && user.pass === 'admin') {
        next();
    } else {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        res.sendStatus(401);
        return;
    }
};


// WEBSITE

app.engine('.hbs', exphbs({
    defaultLayout: 'list',
    extname: '.hbs',
    helpers: {
        dateFormatter: df.formatDate
    },
    compilerOptions: undefined
}));
app.set('view engine', '.hbs');

app.get('/', function (request, response) {
    var data = {
        'title': 'Manor Farm Cottages, Goodmanham',
        'description': 'East Yorkshire self catering holiday cottages',
        'layout': 'page',
        'pageId': 'home'
    };
    response.status(200).set(htmlHeaders).render('home', data);
});


// This start date needs to be dynamic
app.get('/the-cottage', function (request, response) {
    var dt = new Date();
    dataProvider.findByCottageAndStart('the_cottage', 20150402, callback);
    function callback(bookings) {
        var data = {
            'title': 'The Cottage | Manor Farm Cottages, Goodmanham',
            'description': 'East Yorkshire self catering holiday cotages',
            'layout': 'cottage'
        };
        if (bookings && bookings.length > 0) {
            var bookingsObj = {};
            for (var i = 0; i < bookings.length; i++) {
                var startStr = '' + bookings[i].start;
                bookingsObj[startStr] = bookings[i];
            }
            data.calendar = calendar.calendar(dt, 'the_cottage', bookingsObj);
        }
        response.status(200).set(htmlHeaders).render('the-cottage', data);
    }
});

// This start date needs to be dynamic
app.get('/the-stables', function (request, response) {
    var dt = new Date();
    dataProvider.findByCottageAndStart('the_stables', 20150402, callback);
    function callback(bookings) {
        var data = {
            'title': 'The Stables | Manor Farm Cottages, Goodmanham',
            'description': 'East Yorkshire self catering holiday cotages',
            'layout': 'cottage'
        };
        if (bookings && bookings.length > 0) {
            var bookingsObj = {};
            for (var i = 0; i < bookings.length; i++) {
                var startStr = '' + bookings[i].start;
                bookingsObj[startStr] = bookings[i];
            }
            data.calendar = calendar.calendar(dt, 'the_stables', bookingsObj);
        }
        response.status(200).set(htmlHeaders).render('the-stables', data);
    }
});


/*
// URLS

the-cottage
the-stables
*/

app.get('/about-the-village', function (request, response) {
    var data = {
        'title': 'About the village | Manor Farm Cottages, Goodmanham',
        'description': 'East Yorkshire self catering holiday cottages',
        'layout': 'page',
        'pageId': 'about-the-village'
    };
    response.status(200).set(htmlHeaders).render('about-the-village', data);
});

app.get('/things-to-do', function (request, response) {
    var data = {
        'title': 'Things to do | Manor Farm Cottages, Goodmanham',
        'description': 'East Yorkshire self catering holiday cottages',
        'layout': 'page',
        'pageId': 'things-to-do'
    };
    response.status(200).set(htmlHeaders).render('things-to-do', data);
});

app.get('/getting-here', function (request, response) {
    var data = {
        'title': 'Getting here | Manor Farm Cottages, Goodmanham',
        'description': 'East Yorkshire self catering holiday cottages',
        'layout': 'page',
        'pageId': 'getting-here'
    };
    response.status(200).set(htmlHeaders).render('things-to-do', data);
});

app.get('/access-statement', function (request, response) {
    var data = {
        'title': 'Access statement | Manor Farm Cottages, Goodmanham',
        'description': 'East Yorkshire self catering holiday cottages',
        'layout': 'page',
        'pageId': 'access-statement'
    };
    response.status(200).set(htmlHeaders).render('access-statement', data);
});

app.get('/terms-and-conditions', function (request, response) {
    var data = {
        'title': 'Terms and conditions | Manor Farm Cottages, Goodmanham',
        'description': 'East Yorkshire self catering holiday cottages',
        'layout': 'page',
        'pageId': 'terms-and-conditions'
    };
    response.status(200).set(htmlHeaders).render('terms-and-conditions', data);
});

app.get('/privacy-policy', function (request, response) {
    var data = {
        'title': 'Privacy policy | Manor Farm Cottages, Goodmanham',
        'description': 'East Yorkshire self catering holiday cottages',
        'layout': 'page',
        'pageId': 'privacy-policy'
    };
    response.status(200).set(htmlHeaders).render('privacy-policy', data);
});

app.get('/cancellation-policy', function (request, response) {
    var data = {
        'title': 'Cancellation policy | Manor Farm Cottages, Goodmanham',
        'description': 'East Yorkshire self catering holiday cottages',
        'layout': 'page',
        'pageId': 'cancellation-policy'
    };
    response.status(200).set(htmlHeaders).render('cancellation-policy', data);
});


// STATIC ASSETS

app.use('/assets', express.static(__dirname + '/assets'));

// 404

app.use(function (request, response) {
    var data = {
        'title': '404 Page Not Found',
        'layout': 'error'
    };
    response.status(404).set(htmlHeaders).render('404', data);
});


// Kick off server - Heroku or local
var port = process.env.PORT || 3002;
app.listen(port);
console.log('Example app listening at ' + port);