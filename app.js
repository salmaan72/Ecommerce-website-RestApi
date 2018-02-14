const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');
// express instance
const app = express();
// using body parser in the app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api',routes);

// database connection
mongoose.connect('mongodb://localhost/ecomm-api', function(){
  console.log('mongodb connected on default port');
});

app.listen(3000,function(){
  console.log('server listening on port 3000');
});
