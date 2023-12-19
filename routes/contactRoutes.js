const express = require('express');
const {contactUs} = require('../Controllers/contactController');

// establishing routing By express.Router()
const contactRouter = express.Router();

contactRouter.post('/contactus', contactUs);

module.exports = contactRouter;