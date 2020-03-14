const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

//console.log(__dirname)
//console.log(__filename)

//define paths for express config
const publicDirPath = (path.join(__dirname, '../public'))
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')



// app.get('', (req, res) => {
//     res.send('<h1> Weather </h1>')
// })

//setup handlebars engine and view location
//e.g. http://expressjs.com/en/4x/api.html#app.set
app.set('view engine', 'hbs') //tells express.js we are using the hbs engine(handlebars)
app.set('views', viewsPath)  //sets where the templates are
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirPath)) //directory where the public files are

//sets the route for main root
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Joe C1'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Joe C2'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Helpful text here',
        name: 'Joe C3'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 help',
        message: 'Help Article not found',
        name: 'Joe C'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address/location to get the weather for'
        })
    }
    const location = req.query.address
    geocode(location, (error, { latitude, longitude, locationFound } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: forecastData,
                location: locationFound,
                address: req.query.address
            })
        })
    })


})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Joe C4'
    })
})

// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Andrew',
//         age: 27,
//         tel: [
//             { tel1: 123 },
//             { tel2: 234 }
//         ]
//     })
// })

// app.get('/about', (req, res) => {
//     res.send('<h1> About </h1> <h2> About 2 </h2>')
// })

app.listen(3000, () => {
    console.log('Server has started on port 3000')
})