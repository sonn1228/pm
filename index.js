const express = require('express');
const database = require('./config/database');
require('dotenv').config()
const adminRoutes = require('./routes/admin');
const clientRoutes = require('./routes/client');

const app = express();
const port = 3000;

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