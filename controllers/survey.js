
const User = require('../models/user');
const Assessment = require('../models/assessment');
const PdfGenerator = require('../utilities/pdfGenerator');
// const ScreenShot = require('../utilities/screenshot');
var utils = require('../utilities/utilFunctions');
const puppeteer = require('puppeteer');
const bcrypt = require('bcryptjs');
const config = require('../config/global/config');
const questions = require('../config/global/questions');


exports.getSurveySummary = async (req, res, error = null) => {
    const userId = req.user.email;
    Assessment.find({ email: userId }, (err, assessmentData) => {
        if (err || !assessmentData.length) {
            res.render('tribe', { pageTitle: 'Tribe', path: '/tribe', user: req.user.name, isAuthenticated: req.session.isLoggedIn, errorMessage: null });
        }
        else {
            const summary = prepareSurveySummary(assessmentData);
            res.render('your-survey', {
                pageTitle: 'Your Assessment',
                path: '/tribe', user: req.user.name,
                assessmentData: summary,
                isAuthenticated: req.session.isLoggedIn,
                errorMessage: error,
                isLoggedin: req.session.isLoggedIn,
                count: summary.length
            });
        }
    });
}

const prepareSurveySummary = (assessmentData) => {
    const result = [];
    assessmentData.forEach(assessment => {
        assessment.status = "Incompleted";
        const date = assessment.cdate;
        assessment.date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
        if (assessment.answered === 4)
            assessment.status = "Completed"
        result.push(assessment);
    })
    return result;
}

exports.getRequirements = (req, res, next) => {
    if(!req.session.assessmentId) {
        res.render('tribe', {
            pageTitle: 'Tribe',
            comp: req.body.comp,
            path: '/',
            user: req.session.username,
            isUpdating: 'false',
            errorMessage: "Fill the Tribe details First"
          });
    }
    else {
        res.render('requirements-questions', {
            pageTitle: 'Tribe',
            comp: req.body.comp,
            path: '/',
            user: req.session.username,
            questions: questions.requirements,
            isUpdating: 'false',
            errorMessage: null
        });

    }
};


exports.postRequirements = async (req, res, next) => {
    console.log(`Inside postRequirements () `);

    let reqFor = "";

    try {
        if (!req.session.assessmentId) throw new Error("AssessmentId not available in session");
        const assessment = await Assessment.findOne({ _id: req.session.assessmentId }).exec();
        if (!assessment) throw new Error("Insert Your Tribe Deatils First");
        var answers = {};
        answers.requirements = {};

        answers.requirements.c1 = {};
        answers.requirements.c2 = {};
        answers.requirements.c3 = {};

        answers.testing = {};
        answers.testing.c1 = {};
        answers.testing.c2 = {};
        answers.testing.c3 = {};

        answers.build = {};
        answers.build.c1 = {};
        answers.build.c2 = {};
        answers.build.c3 = {};

        answers.deploy = {};
        answers.deploy.c1 = {};
        answers.deploy.c2= {};
        answers.deploy.c3 = {};

        assessment.answered = 1;

        delete req.body['_csrf'];
        delete req.body['isUpdating'];

        if (req.body.proceed) {
            reqFor = "proceed";
            delete req.body.proceed;
        }
        else if (req.body.save) {
            reqFor = "save";
            delete req.body.save;
        }

        var allQuestions = Object.keys(req.body);
        allQuestions.forEach((questionName) => {
            if (req.body[questionName]) {
                var competency = questionName.slice(0, 2);
                var question = questionName.slice(3, 9);
                answers.requirements[competency][question] = req.body[questionName];
            }
        });

        await Assessment.updateOne({ _id: assessment._id }, { $set: { answered: 1, answers: answers, updated_at: utils.getCurrentDate() } }).exec();

        console.log("Assesment Data Updated successfully");

        if (reqFor === "proceed") {
            console.log("Requesting for next section");
            res.redirect('/survey/testing');
        }
        else if (reqFor === "save") {
            console.log("Will be in same section");
            console.log(answers.requirements);
            req.flash('success', 'Data saved successfully');
            res.render('requirements-questions', {
                pageTitle: 'Requirements',
                path: '/',
                user: req.session.username,
                showForm: req.body,
                isUpdating: req.body.isUpdating,
                questions: questions.requirements,
                errorMessage: null
            });

        }
    }
    catch (err) {
        res.render('tribe', {
            pageTitle: 'Tribe Details',
            path: '/',
            user: req.session.username,
            isUpdating: req.body.isUpdating,
            errorMessage: err.message ? err.message : JSON.stringify(err)
        });
    }
};

exports.getTesting = (req, res, next) => {
    if(!req.session.assessmentId) {
        res.render('tribe', {
            pageTitle: 'Tribe',
            comp: req.body.comp,
            path: '/',
            user: req.session.username,
            isUpdating: 'false',
            errorMessage: "Fill the Tribe details First"
          });
    }
    else {
        res.render('testing-questions', {
            pageTitle: 'Tribe',
            comp: req.body.comp,
            path: '/',
            user: req.session.username,
            questions: questions.testing,
            isUpdating: 'false',
            errorMessage: null
        });

    }
};

exports.postTesting = async (req, res, next) => {
    console.log(`Inside postTesting () `);
    console.log(req.body);

    try {

        if (!req.session.assessmentId) throw new Error("AssessmentId not available in session");
        const assessment = await Assessment.findOne({ _id: req.session.assessmentId }).exec();
        if (!assessment) throw new Error("Insert Your Tribe Deatils First");


        let reqFor = "";
        var testing = {};
        testing.c1 = {};
        testing.c2 = {};
        testing.c3 = {};

        delete req.body['_csrf'];
        delete req.body['isUpdating'];

        if (req.body.proceed) {
            reqFor = "proceed";
            delete req.body.proceed;
        }
        else if (req.body.save) {
            reqFor = "save";
            delete req.body.save;
        }
        // else if (req.body.back) {
        //     reqFor = "back";
        //     delete req.body.back;
        // }

        var allQuestions = Object.keys(req.body);
        allQuestions.forEach((questionName) => {
            if (req.body[questionName]) {
                var competency = questionName.slice(0, 2);
                var question = questionName.slice(3, 9);
                testing[competency][question] = req.body[questionName];
            }
        });
        assessment.answers.testing = testing;
        await Assessment.updateOne({ _id: assessment._id }, { $set: { answered: 2, answers: assessment.answers, updated_at: utils.getCurrentDate() } }).exec();

        if (reqFor === "proceed") {
            console.log("Requesting for next section");
            res.redirect('/survey/build');
        }
        else if (reqFor === "save") {
            console.log("Will be in same section");
            req.flash('success', 'Data saved successfully');
            res.render('testing-questions', {
                pageTitle: 'Testing',
                path: '/',
                user: req.session.username,
                showForm: req.body,
                isUpdating: req.body.isUpdating,
                questions: questions.testing,
                errorMessage: null
            });
        }
    }
    catch (err) {
        res.render('tribe', {
            pageTitle: 'Tribe Details',
            path: '/',
            user: req.session.username,
            isUpdating: req.body.isUpdating,
            errorMessage: err.message ? err.message : JSON.stringify(err)
        });
    }
};


exports.getBuild = (req, res, next) => {
    if(!req.session.assessmentId) {
        res.render('tribe', {
            pageTitle: 'Tribe',
            comp: req.body.comp,
            path: '/',
            user: req.session.username,
            isUpdating: 'false',
            errorMessage: "Fill the Tribe details First"
          });
    }
    else {
        res.render('build-questions', {
            pageTitle: 'Tribe',
            comp: req.body.comp,
            path: '/',
            user: req.session.username,
            questions: questions.build,
            isUpdating: 'false',
            errorMessage: null
        });

    }
};

exports.postBuild = async (req, res, next) => {
    console.log(`Inside postBuild () `);
    console.log(req.body);

    try {

        if (!req.session.assessmentId) throw new Error("AssessmentId not available in session");
        const assessment = await Assessment.findOne({ _id: req.session.assessmentId }).exec();
        if (!assessment) throw new Error("Insert Your Tribe Deatils First");

        let reqFor = "";
        var build = {};

        build.c1 = {};
        build.c2 = {};
        build.c3 = {};

        delete req.body['_csrf'];
        delete req.body['isUpdating'];

        if (req.body.proceed) {
            reqFor = "proceed";
            delete req.body.proceed;
        }
        else if (req.body.save) {
            reqFor = "save";
            delete req.body.save;
        }

        var allQuestions = Object.keys(req.body);
        allQuestions.forEach((questionName) => {
            if (req.body[questionName]) {
                var competency = questionName.slice(0, 2);
                var question = questionName.slice(3, 9);
                build[competency][question] = req.body[questionName];
            }
        });

        assessment.answers.build = build;
        await Assessment.updateOne({ _id: assessment._id }, { $set: { answered: 3, answers: assessment.answers, updated_at: utils.getCurrentDate() } }).exec();

        if (reqFor === "proceed") {
            res.redirect('/survey/deploy');
        }
        else if (reqFor === "save") {
            console.log("Will be in same section");
            req.flash('success', 'Data saved successfully');
            res.render('build-questions', {
                pageTitle: 'Build',
                path: '/',
                user: req.session.username,
                showForm: req.body,
                isUpdating: req.body.isUpdating,
                questions: questions.build,
                errorMessage: null
            });
        }
    }
    catch (err) {
        res.render('tribe', {
            pageTitle: 'Tribe Details',
            path: '/',
            user: req.session.username,
            isUpdating: req.body.isUpdating,
            errorMessage: err.message ? err.message : JSON.stringify(err)
        });
    }
};

exports.getDeploy = (req, res, next) => {
    if(!req.session.assessmentId) {
        res.render('tribe', {
            pageTitle: 'Tribe',
            comp: req.body.comp,
            path: '/',
            user: req.session.username,
            isUpdating: 'false',
            errorMessage: "Fill the Tribe details First"
          });
    }
    else {
        res.render('deploy-questions', {
            pageTitle: 'Tribe',
            comp: req.body.comp,
            path: '/',
            user: req.session.username,
            questions: questions.deploy,
            isUpdating: 'false',
            errorMessage: null
        });

    }
};

exports.postDeploy = async (req, res, next) => {
    console.log(`Inside postDeploy () `);
    console.log(req.body);

    try {
        if (!req.session.assessmentId) throw new Error("AssessmentId not available in session");
        const assessment = await Assessment.findOne({ _id: req.session.assessmentId }).exec();
        if (!assessment) throw new Error("Insert Your Tribe Deatils First");

        let reqFor = "";
        var deploy = {};
        deploy.c1 = {};
        deploy.c2 = {};
        deploy.c3 = {};

        delete req.body['_csrf'];
        delete req.body['isUpdating'];

        if (req.body.proceed) {
            reqFor = "proceed";
            delete req.body.proceed;
        }
        else if (req.body.save) {
            reqFor = "save";
            delete req.body.save;
        }

        var allQuestions = Object.keys(req.body);
        allQuestions.forEach((questionName) => {
            if (req.body[questionName]) {
                var competency = questionName.slice(0, 2);
                var question = questionName.slice(3, 9);
                deploy[competency][question] = req.body[questionName];
            }
        });
        assessment.answers.deploy = deploy;
        await Assessment.updateOne({ _id: assessment._id }, { $set: { answered: 4, answers: assessment.answers, updated_at: utils.getCurrentDate() } }).exec();

        console.log(`Deploy answers updated successfully`);
        if (reqFor === "proceed") {
            res.render('submit-survey', {
                pageTitle: 'Thank you',
                path: '/',
                user: req.session.username
            });
        }
        else if (reqFor === "save") {
            console.log("Will be in same sectioin");
            res.render('deploy-questions', {
                pageTitle: 'deploy-questions',
                comp: req.body.comp,
                path: '/',
                user: req.session.username,
                showForm: req.body,
                isUpdating: req.body.isUpdating,
                questions: questions.deploy,
                errorMessage: null
            });
        }

    }
    catch (err) {
        res.render('tribe', {
            pageTitle: 'Tribe Details',
            path: '/',
            user: req.session.username,
            isUpdating: req.body.isUpdating,
            errorMessage: err.message ? err.message : JSON.stringify(err)
        });
    }
};

exports.getReviewSurvey = async (req, res, next) => {
    console.log(`Inside get Survey() `);
    try {
        if (!req.session.assessmentId) throw new Error("AssessmentId not available in session");
        const assessment = await Assessment.findOne({ _id: req.session.assessmentId }).exec();
        if (!assessment) throw new Error("Insert Your Tribe Deatils First");

        if (assessment.answered === 0) {
            console.log("Survey data doesnot exist");
            // req.flash('error', 'You have not taken the survey yet. Please complete the below questionaries first');
            res.render('requirements-questions', { pageTitle: 'Requirements', path: '/requirements', user: req.session.username, isAuthenticated: 'true', isUpdating: req.body.isUpdating, errorMessage: 'You have no completed assessment to view.' });
        }
        else if (assessment.answered === 1) {
            res.render('testing-questions', { pageTitle: 'Testing', comp: req.body.comp, path: '/testing', user: req.session.username, isUpdating: req.body.isUpdating, isAuthenticated: 'true', errorMessage: 'You have no completed assessment to view.' });
        }

        else if (assessment.answered === 2) {
            res.render('build-questions', { pageTitle: 'Build', comp: req.body.comp, path: '/build', user: req.session.username, isUpdating: req.body.isUpdating, isAuthenticated: 'true', errorMessage: 'You have no completed assessment to view.' });
        }

        else if (assessment.answered === 3) {
            res.render('deploy-questions', { pageTitle: 'Deploy', comp: req.body.comp, path: '/deploy', user: req.session.username, isUpdating: req.body.isUpdating, isAuthenticated: 'true', errorMessage: 'You have no completed assessment to view.' });
        }
        else {
            res.render('review-survey',
                {
                    pageTitle: 'Review Survey',
                    path: '/',
                    user: req.session.username,
                    answers: assessment.answers,
                })
        }
    }
    catch (err) {
        res.render('requirements-questions', { pageTitle: 'Requirements', path: '/requirements', user: req.session.username, isAuthenticated: 'true', isUpdating: req.body.isUpdating, errorMessage: 'You have no completed assessment to view.' });
    }
};

exports.postReviewSurvey = async (req, res, next) => {
    console.log(`Inside postReviewSurvey() `);
    try {
        if (!req.body.assessmentId) throw new Error("AssessmentId not available in session");
        const assessment = await Assessment.findOne({ _id: req.body.assessmentId }).exec();
        if (!assessment) throw new Error("Assessment could not be found");

        res.render('review-survey',
            {
                pageTitle: 'Review Survey',
                path: '/',
                user: req.session.username,
                questions: questions,
                assessment: assessment
            })
    }
    catch (err) {
        const errorMessage = err.message ? err.message : JSON.stringify(err);
        this.getSurveySummary(req, res, errorMessage);
    }
};

exports.getUpdatedRequirements = (req, res, next) => {
    //     console.log(`Inside get Updated Requirements()`);
    //     console.log(req.body);
    //     user = req.session.email;
    //     if (!user) {
    //         res.redirect('/sign-up-in#tologin')
    //     }
    //     else {
    //         Assessment.findOne({ email: user })
    //             .then(tribe => {
    //                 if (!tribe) {
    //                     console.log("Survey data doesnot exist");
    //                     return req.session.save(err => {
    //                         if (err) {
    //                             console.log(err);
    //                             req.flash('error', 'Error Occured while creating session');
    //                             res.redirect('/sign-up-in');
    //                         }
    //                         console.log(`Sending to /tribe`);
    //                         res.render('tribe', { pageTitle: 'Enter Tribe Details', path: '/', user: req.session.username, isAuthenticated: 'true', errorMessage: 'Please Complete your Tribe details first' });
    //                     });
    //                 }

    //                 else {
    //                     Answers.findOne({ email: user })
    //                         .then(answers => {

    //                             if (!answers) {
    //                                 console.log("Survey data doesnot exist");

    //                                 return req.session.save(err => {
    //                                     if (err) {
    //                                         console.log(err);
    //                                         req.flash('error', 'Error Occured while creating session');
    //                                         res.redirect('/sign-up-in');
    //                                     }


    //                                 });
    //                             }

    //                             else {
    //                                 console.log(answers);
    //                                 console.log(answers.answers.requirements.requirements_basic[0]);
    //                                 console.log(`Sending to Questionaires`);
    //                                 console.log(answers.availed);

    //                                 if (answers.availed === 1) {
    //                                     res.render('testing-questions', { pageTitle: 'Testing', comp: req.body.comp, path: '/testing', user: req.session.username, isUpdating: req.body.isUpdating, isAuthenticated: 'true', errorMessage: null });
    //                                 }

    //                                 else if (answers.availed === 2) {
    //                                     res.render('build-questions', { pageTitle: 'Build', comp: req.body.comp, path: '/build', user: req.session.username, isUpdating: req.body.isUpdating, isAuthenticated: 'true', errorMessage: null });
    //                                 }

    //                                 else if (answers.availed === 3) {
    //                                     res.render('deploy-questions', { pageTitle: 'Deploy', comp: req.body.comp, path: '/deploy', user: req.session.username, isUpdating: req.body.isUpdating, isAuthenticated: 'true', errorMessage: null });
    //                                 }
    //                                 else if (answers.availed === 4 || answers.availed === 0) {
    //                                     res.render('requirements-questions', { pageTitle: 'Requirements', path: '/requirements', user: req.session.username, isAuthenticated: 'true', isUpdating: req.body.isUpdating, errorMessage: null });
    //                                 }
    //                                 else {
    //                                     res.render('review-survey',
    //                                         {
    //                                             pageTitle: 'Review Survey',
    //                                             path: '/',
    //                                             user: req.session.username,
    //                                             comp: answers.competency,
    //                                             answers: answers.answers
    //                                         })
    //                                 }
    //                             }

    //                         });

    //                 }
    //             })
    //             .catch((err) => {
    //                 console.log("Error Occured::" + err);
    //                 throw err;
    //             })
    //     }
};

exports.getResult = async (req, res, next) => {
    try {
        if (!req.session.assessmentId) throw new Error("AssessmentId not available in session");
        const assessment = await Assessment.findOne({ _id: req.session.assessmentId }).exec();
        if (!assessment) throw new Error("Insert Your Tribe Deatils First");

        if (assessment.answered === 4) {
            var answerObj = JSON.parse(JSON.stringify(assessment.answers));

            const date = assessment.updated_at;
            const completion_date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();


            var stats = {};
            stats.requirements = {};
            stats.testing = {};
            stats.build = {};
            stats.deploy = {};

            stats.requirements.c1 = {};
            stats.requirements.c2 = {};
            stats.requirements.c3 = {};
            stats.testing.c1 = {};
            stats.testing.c2 = {};
            stats.testing.c3 = {};
            stats.build.c1 = {};
            stats.build.c2 = {};
            stats.build.c3  = {};
            stats.deploy.c1 = {};
            stats.deploy.c2 = {};
            stats.deploy.c3  = {};

            stats.requirements.c1.yes = stats.requirements.c1.no = stats.requirements.c2.yes = stats.requirements.c2.no = stats.requirements.c3.yes = stats.requirements.c3.no = stats.testing.c1.yes = stats.testing.c1.no = stats.testing.c2.yes = stats.testing.c2.no = stats.testing.c3.yes = stats.testing.c3.no = stats.build.c1.yes = stats.build.c1.no = stats.build.c2.yes = stats.build.c2.no = stats.build.c3.yes = stats.build.c3.no = stats.deploy.c1.yes = stats.deploy.c1.no = stats.deploy.c2.yes = stats.deploy.c2.no = stats.deploy.c2.yes = stats.deploy.c2.no = stats.deploy.c3.yes = stats.deploy.c3.no = 0

            Object.keys(answerObj).forEach((section) => {
                Object.keys(answerObj[section]).forEach(competency => {
                    Object.keys(answerObj[section][competency]).forEach(question => {
                        if (answerObj[section][competency][question] === "false" || answerObj[section][competency][question] === "NA")
                            stats[section][competency]['no']++;
                        else if (answerObj[section][competency][question] === "true")
                            stats[section][competency]['yes']++;
                    })
                })
            });

            console.log(stats);
            const businessname = assessment.businessname;
            const tribename = assessment.tribename;
            const squadname = assessment.squadname
            const date1 = assessment.cdate
            const startdate = date1.getDate() + "-" + (date1.getMonth() + 1) + "-" + date1.getFullYear();
            res.render('result', { pageTitle: 'Result', stats: stats, businessname: businessname, tribename: tribename, squadname: squadname, startdate: startdate, date: completion_date, path: '/', user: req.session.username });
        }
        else {
            if (assessment.answered === 1) {
                res.render('testing-questions', { pageTitle: 'Testing', comp: req.body.comp, path: '/testing', user: req.session.username, isUpdating: req.body.isUpdating, isAuthenticated: 'true', errorMessage: 'You have no completed assessment to view.' });
            }
            else if (assessment.answered === 2) {
                res.render('build-questions', { pageTitle: 'Build', comp: req.body.comp, path: '/build', user: req.session.username, isUpdating: req.body.isUpdating, isAuthenticated: 'true', errorMessage: 'You have no completed assessment to view.' });
            }
            else if (assessment.answered === 3) {
                res.render('deploy-questions', { pageTitle: 'Deploy', comp: req.body.comp, path: '/deploy', user: req.session.username, isUpdating: req.body.isUpdating, isAuthenticated: 'true', errorMessage: 'You have no completed assessment to view.' });
            }
            else if (assessment.answered === 0) {
                res.render('requirements-questions', { pageTitle: 'Requirements', path: '/requirements', user: req.session.username, isAuthenticated: 'true', isUpdating: req.body.isUpdating, errorMessage: 'You have no completed assessment to view.' });
            }
        }
    }
    catch (err) {
        console.log(err);
        res.render('tribe', {
            pageTitle: 'Tribe Details',
            path: '/',
            user: req.session.username,
            isUpdating: req.body.isUpdating,
            errorMessage: err.message ? err.message : JSON.stringify(err)
        });
    }
};

exports.sendResultEmail = (req, res, next) => {
    //     const email = req.session.email;
    //     User.findOne({ email: email })
    //         .then(users => {
    //             if (users) {
    //                 console.log(users);
    //                 const pwd = users.normalpwd;

    //                 Answers.findOne({ email: req.session.email })
    //                     .then(answers => {
    //                         const date = answers.lastUpdatedDate;
    //                         const DD = date.getDate();
    //                         const MM = date.getMonth() + 1;
    //                         const YYYY = date.getFullYear();
    //                         const completion_date = '' + DD + '-' + MM + '-' + YYYY;

    //                         Assessment.findOne({ email: req.session.email })
    //                             .then(async (tribedata) => {
    //                                 await PdfGenerator(tribedata, users, completion_date);
    //                                 console.log("PDF Mail method called");

    //                                 res.render('home', { pageTitle: 'Home', comp: req.body.comp, path: '/', user: req.session.username, isLoggedin: true, errorMessage: 'Result email has been sent to ' + req.session.email + '. Please check your mailbox.' });
    //                             })
    //                             .catch((err) => {
    //                                 console.log("Error Occured::" + err);
    //                                 throw err;
    //                             })
    //                     })


    //             }
    //         })

    //         .catch((err) => {
    //             console.log("Error Occured::" + err);
    //             throw err;
    //         })

};