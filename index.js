const express = require('express');
const methodOverride = require('method-override')
const database = require('./config/database');
require('dotenv').config()
const adminRoutes = require('./routes/admin');
const clientRoutes = require('./routes/client');
const systemConfig = require('./config/system');
const app = express();
const port = process.env.PORT;

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