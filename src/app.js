// nodemon src/app.js: nodemon restart/reload only the app (not the templates).
//nodemon src/app.js -e js,hbs: nodemon restart/reload the app and all the extensions described after the -e 
// parameter.
const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


//node variables
//console.log(__dirname);
//console.log(path.join(__dirname, '../public'));

const app = express();

// define paths for Express configuration.
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// setting-up handlebars engine (hbs)
app.set('view engine', 'hbs');
// setting-up the views location directory
app.set('views',viewsPath);
// registering the partials path with hbs
hbs.registerPartials(partialsPath);


//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather application!',
        name: 'albator'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Remi'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is the help page',
        title: 'Help',
        name: 'Rémi'
    })
});


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude,country } = {}) => {
        if (error) {
          return res.send({ error })
        }
          
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                country: country,
                forecast: forecastData,
                location: req.query.address          
            })

        });
    })
});


app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }

    res.send({
        products: []
    })
});

// catch all for 'help' 404
app.get('/help/*', (req, res) => {
    res.render('error', {
        errorMessage: 'Help article not found',
        title: '404',
        name: 'Rémi'
    })
});

// '*' matches anything that has not been matched so far.
// that 'get' call must be at the bottom of all the 'get' commands
app.get('*', (req, res) => {
    res.render('error', {
        errorMessage: 'Page not found',
        title: '404',
        name: 'Rémi'
    })
});


// starting up the server
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});