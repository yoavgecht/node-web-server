const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express(); //creating express app


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public')); //middleware

app.use((req, res, next) => { //next - when we are done. move on
    var now =  new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);

    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log.');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintanence.hbs', {
//         maintanence: 'Site in maintanence. we will br right back'
//     });
// });

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})


app.get('/help', (req, res) => {
    res.sendFile(__dirname + '/public/help.html');
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        welcomeMessage: 'Welcome to my page!',
        pageTitle: 'Home Page',
    });
})

.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
})

.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    })
})


app.listen(port, () => {
    console.log(`Server is up on ${port}`);
});

