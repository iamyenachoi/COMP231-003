const express = require('express');

const emailConfirmationRouter = express.Router();

const emailConfirm = require("../Controller/emailConfirm");

emailConfirmationRouter.post("/emailConfirm", emailConfirm);

module.exports = emailConfirmationRouter;