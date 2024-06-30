const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('express-flash')
const express = require('express');
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const database = require('./config/database');
require('dotenv').config()
const adminRoutes = require('./routes/admin');
const clientRoutes = require('./routes/client');
const systemConfig = require('./config/system');
const app = express();
const port = process.env.PORT;


// express flash
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

// body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: false }))
// method override
app.use(methodOverride('_method'))

// app local variable: Chỉ dùng ở trong file pug
app.locals.prefixAdmin = systemConfig.prefixAdmin;
// system config


// connect database
database.connect();
// static dir
app.use(express.static(`./public`));
// view dir
app.set('views', `./views`);

// routes
adminRoutes(app);
clientRoutes(app);







app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})