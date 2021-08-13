const express = require('express');
const path = require('path');
const route = require('./server/routes/router');
require('./server/database/connection');
const hbs = require('hbs');
const session = require('express-session');
const flash = require('connect-flash');

const port = process.env.PORT || 8000;
const app = express();

app.use(session({
    secret: 'secret',
    cookie: {maxAge: 60000},
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set("view engine","hbs");
app.set("views",path.join(__dirname,'./views/template'));
hbs.registerPartials(path.join(__dirname,'./views/partials'));

hbs.registerHelper('string', function(str){
    var ans = str.toString().substr(4,20);
    return ans;
});

hbs.registerHelper('serial', function(index){
    var ans = index + 1;
    return ans;
});

app.use(express.static(path.join(__dirname,'./asset')));

app.use(route);

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})