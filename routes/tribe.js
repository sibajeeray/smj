const express = require('express');
const { check, body } = require('express-validator/check');

const tribeController = require('../controllers/tribe');

const router = express.Router();

router.get('/tribe', tribeController.getTribe);

let date2 = Date.now();

let date_ob = new Date(date2);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();

let today= year + "-" + month + "-" + date;


router.post('/tribe',
    [
        body('tribename')
            .isString()
            .trim()
            .withMessage('Please enter a valid Tribe name'),
        body('squadname')
            .isString()
            .trim()
            .withMessage('Please enter a valid Squad name'),
        body('personname')
            .isString()
            .trim()
            .withMessage('Please enter a valid name of the person'),
        body('cdate')
            .toDate(),
            // .isAfter(today)
            // .isBefore(today)
            // .withMessage('Please enter a valid date'),
        body('talname')
            .isString()
            .withMessage('Please enter a valid TAL name'),
        body('tplname')
            .isString()
            .withMessage('Please enter a valid TPL name')
    ],
    tribeController.postTribe);

router.post('/tribe-result', tribeController.postAdminTribe);

router.get('/tribe-result1', tribeController.getAdminTribeResult);

module.exports = router;