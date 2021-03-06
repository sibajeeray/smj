const path = require('path');
const express= require('express');

const surveyController = require('../controllers/survey');

const router= express.Router();

router.get('/test', (req, res)=>{
    res.render('test', { pageTitle: 'test', path: '/' });
});

router.get('/',surveyController.getSurveySummary);

router.get('/requirements',surveyController.getRequirements);

router.post('/requirements',surveyController.postRequirements);

router.get('/testing',surveyController.getTesting);

router.post('/testing',surveyController.postTesting);

router.get('/build',surveyController.getBuild);

router.post('/build',surveyController.postBuild);

router.get('/deploy',surveyController.getDeploy);

router.post('/deploy',surveyController.postDeploy);

router.post('/review-survey', surveyController.postReviewSurvey);

router.get('/review-survey', surveyController.getReviewSurvey); 

router.post('/result', surveyController.getResult);

router.get('/result',surveyController.getResult);

router.get('/send-result',surveyController.sendResultEmail);

router.post('/complete-survey', surveyController.completeSurvey);

router.post('/update-survey', surveyController.updateSurvey);

/* Update Routes */

router.post('/update-requirements', surveyController.getUpdatedRequirements);

router.get('/update-testing/:action?', surveyController.getUpdatedTesting);

router.get('/update-build/:action?', surveyController.getUpdatedBuild);

router.get('/update-deploy/:action?', surveyController.getUpdatedDeploy);

module.exports= router;