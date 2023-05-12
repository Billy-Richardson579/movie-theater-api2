const express = require('express');
const app = express();
const routerUser = require('./routers/user');
const routerShow = require('./routers/show');

// Middleware
app.use(express.json());

// Routes
app.use('/users', routerUser);
app.use('/shows', routerShow);

module.exports = { app, routerUser, routerShow };