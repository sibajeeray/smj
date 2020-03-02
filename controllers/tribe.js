const Assessment = require('../models/assessment');
const { validationResult } = require('express-validator/check');

exports.getTribe = (req, res, next) => {
  res.render('tribe', { pageTitle: 'Tribe', path: '/', user: req.session.username, errorMessage: null });
};


exports.postTribe = async (req, res, next) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('tribe', {
        path: '/',
        pageTitle: 'Enter Tribe Details',
        errorMessage: errors.array()[0].msg,
        user: req.session.email
      });
    }
    const assessmentData = new Assessment({
      businessname: req.body.businessname,
      tribename: req.body.tribename,
      squadname: req.body.squadname,
      personname: req.body.personname,
      cdate: new Date(req.body.cdate),
      talname: req.body.talname,
      tplname: req.body.tplname,
      userId: req.session.userId,
      email: req.session.email
    });
    
    const result = await assessmentData.save();
    req.session.assessmentId = result._id;
    console.log("Assessment data saved to DB")
    res.redirect('/survey/requirements');
  }
  catch(err){
    console.log(err);
    res.render('tribe', {
      pageTitle: 'Tribe',
      comp: req.body.comp,
      path: '/',
      user: req.session.username,
      isUpdating: 'false',
      errorMessage: "Unknown Error Occured"
    });
  }

};

exports.postAdminTribe = (req, res, next) => {
  res.render('tribe-result', { pageTitle: 'Tribe', path: '/', user: req.session.email, errorMessage: null });
};

exports.getAdminTribeResult = (req, res, next) => {
  res.render('tribe-result', { pageTitle: 'Tribe', path: '/', user: req.session.email });
};

