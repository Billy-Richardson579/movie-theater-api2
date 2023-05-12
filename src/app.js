const express = require('express');
const app = express();
const routerUser = require('./routers/user')
const routerShow = require('./routers/show'); 

// Middleware
app.use(express.json());

// Routes
app.use('/user', routerShow);

app.use('/show', routerUser);

  module.exports = {app,routerShow,routerUser};