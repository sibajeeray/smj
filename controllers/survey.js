
const User = require('../models/user');
const Assessment = require('../models/assessment');
const PdfGenerator = require('../utilities/pdfGenerator');
// const ScreenShot = require('../utilities/screenshot');
var utils = require('../utilities/utilFunctions');
const puppeteer = require('puppeteer');
const bcrypt = require('bcryptjs');
const config = require('../config/global/config');


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
    console.log(`Inside get Requirements()`);
    res.render('requirement-questions', { pageTitle: 'Requirements', comp: req.body.comp, path: '/', user: req.session.email, isUpdating: 'false' });
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

        answers.requirements.requirements_basic = {};
        answers.requirements.requirements_intermediate = {};
        answers.requirements.requirements_mature = {};

        answers.testing = {};
        answers.testing.testing_basic = {};
        answers.testing.testing_intermediate = {};
        answers.testing.testing_mature = {};

        answers.build = {};
        answers.build.build_basic = {};
        answers.build.build_intermediate = {};
        answers.build.build_mature = {};

        answers.deploy = {};
        answers.deploy.deploy_basic = {};
        answers.deploy.deploy_intermediate = {};
        answers.deploy.deploy_mature = {};

        assessment.answered = 1;

        var comp = {
            c1: "requirements_basic",
            c2: "requirements_intermediate",
            c3: "requirements_mature"
        }
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

        var questions = Object.keys(req.body);
        questions.forEach((questionName) => {
            if (req.body[questionName]) {
                var type = comp[questionName.slice(0, 2)];
                answers.requirements[type][questionName] = req.body[questionName];
            }
        });

        await Assessment.updateOne({ _id: assessment._id }, { $set: { answered: 1, answers: answers, updated_at: utils.getCurrentDate() } }).exec();

        console.log("Assesment Data Updated successfully");

        if (reqFor === "proceed") {
            console.log("Requesting for next section");
            res.render('testing-questions', {
                pageTitle: 'Testing',
                path: '/',
                user: req.session.username,
                isUpdating: req.body.isUpdating,
                errorMessage: null
            });
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
    res.render('testing-questions', { pageTitle: 'Testing', comp: req.body.comp, path: '/', user: req.session.email });
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

        testing.testing_basic = {};
        testing.testing_intermediate = {};
        testing.testing_mature = {};

        var comp = {
            c1: "testing_basic",
            c2: "testing_intermediate",
            c3: "testing_mature"
        }
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

        var questions = Object.keys(req.body);
        questions.forEach((questionName) => {
            if (req.body[questionName]) {
                var type = comp[questionName.slice(0, 2)];
                testing[type][questionName] = req.body[questionName];
            }
        });

        console.log(testing);
        assessment.answers.testing = testing;
        await Assessment.updateOne({ _id: assessment._id }, { $set: { answered: 2, answers: assessment.answers, updated_at: utils.getCurrentDate() } }).exec();

        if (reqFor === "proceed") {
            console.log("Requesting for next section");
            res.render('build-questions', {
                pageTitle: 'Build',
                path: '/',
                user: req.session.username,
                isUpdating: req.body.isUpdating,
                errorMessage: null
            });
        }
        else if (reqFor === "save") {
            console.log("Will be in same section");
            console.log(testing);
            req.flash('success', 'Data saved successfully');
            res.render('testing-questions', {
                pageTitle: 'Testing',
                path: '/',
                user: req.session.username,
                showForm: req.body,
                isUpdating: req.body.isUpdating,
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
    res.render('build-questions', { pageTitle: 'Build', comp: req.body.comp, path: '/', user: req.session.email });
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

        build.build_basic = {};
        build.build_intermediate = {};
        build.build_mature = {};

        var comp = {
            c1: "build_basic",
            c2: "build_intermediate",
            c3: "build_mature"
        }
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

        var questions = Object.keys(req.body);
        questions.forEach((questionName) => {
            if (req.body[questionName]) {
                var type = comp[questionName.slice(0, 2)];
                build[type][questionName] = req.body[questionName];
            }
        });

        assessment.answers.build = build;
        await Assessment.updateOne({ _id: assessment._id }, { $set: { answered: 3, answers: assessment.answers, updated_at: utils.getCurrentDate() } }).exec();

        if (reqFor === "proceed") {
            res.render('deploy-questions', {
                pageTitle: 'Deploy Questions',
                path: '/',
                user: req.session.username,
                isUpdating: req.body.isUpdating,
                errorMessage: null
            });
            console.log("##");
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
    res.render('deploy-questions', { pageTitle: 'Deploy', comp: req.body.comp, path: '/', user: req.session.email });
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
        deploy.deploy_basic = {};
        deploy.deploy_intermediate = {};
        deploy.deploy_mature = {};

        var comp = {
            c1: "deploy_basic",
            c2: "deploy_intermediate",
            c3: "deploy_mature"
        }
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

        var questions = Object.keys(req.body);
        questions.forEach((questionName) => {
            if (req.body[questionName]) {
                var type = comp[questionName.slice(0, 2)];
                deploy[type][questionName] = req.body[questionName];
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
                    data: assessment.answered,
                    assessmentId: assessment._id
                })
        }
    }
    catch (err) {
        res.render('requirements-questions', { pageTitle: 'Requirements', path: '/requirements', user: req.session.username, isAuthenticated: 'true', isUpdating: req.body.isUpdating, errorMessage: 'You have no completed assessment to view.' });
    }
};

exports.getViewSurvey = async (req, res) => {
    console.log(`Inside getViewSurvey() `);
    const assessment = await Assessment.findOne({ _id: "5e5b8403d7527e08a48f8968" }).exec();
    prepareQandA(config.questions, assessment.answers);
    res.render('review-survey',
        {
            pageTitle: 'Review Survey',
            path: '/',
            questions: config.questions
            // user: req.session.username,
            // assessment: assessment
        })
}

const prepareQandA = (questions, answers) => {
    var result = {}
    Object.keys(answers).forEach((section) => {
        result[section] = {};
        result
    })
}

exports.postReviewSurvey = async (req, res, next) => {
    console.log(`Inside postReviewSurvey() `);
    try {

        if (!req.body.assessmentId) throw new Error("AssessmentId not available in session");
        req.session.assessmentId = req.body.assessmentId
        const assessment = await Assessment.findOne({ _id: req.body.assessmentId }).exec();
        if (!assessment) throw new Error("Assessment could not be found");

        res.render('review-survey',
            {
                pageTitle: 'Review Survey',
                path: '/',
                user: req.session.username,
                answers: assessment.answers,
                data: assessment.answered,
                assessmentId: assessment._id
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
        if (!req.session.assessmentId) req.session.assessmentId = req.body.assessmentId
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

            stats.requirements.requirements_basic = {};
            stats.requirements.requirements_intermediate = {};
            stats.requirements.requirements_mature = {};
            stats.testing.testing_basic = {};
            stats.testing.testing_intermediate = {};
            stats.testing.testing_mature = {};
            stats.build.build_basic = {};
            stats.build.build_intermediate = {};
            stats.build.build_mature = {};
            stats.deploy.deploy_basic = {};
            stats.deploy.deploy_intermediate = {};
            stats.deploy.deploy_mature = {};

            stats.requirements.requirements_basic.yes = stats.requirements.requirements_basic.no = stats.requirements.requirements_intermediate.yes = stats.requirements.requirements_intermediate.no = stats.requirements.requirements_mature.yes = stats.requirements.requirements_mature.no = stats.testing.testing_basic.yes = stats.testing.testing_basic.no = stats.testing.testing_intermediate.yes = stats.testing.testing_intermediate.no = stats.testing.testing_mature.yes = stats.testing.testing_mature.no = stats.build.build_basic.yes = stats.build.build_basic.no = stats.build.build_intermediate.yes = stats.build.build_intermediate.no = stats.build.build_mature.yes = stats.build.build_mature.no = stats.deploy.deploy_basic.yes = stats.deploy.deploy_basic.no = stats.deploy.deploy_intermediate.yes = stats.deploy.deploy_intermediate.no = stats.deploy.deploy_intermediate.yes = stats.deploy.deploy_intermediate.no = stats.deploy.deploy_mature.yes = stats.deploy.deploy_mature.no = 0
            // stats.requirements.yes = stats.requirements.no = stats.testing.yes = stats.testing.no = stats.build.yes = stats.build.no = stats.deploy.yes = stats.deploy.no = 0

            Object.keys(answerObj).forEach((category) => {
                Object.keys(answerObj[category]).forEach(newcategory => {
                    Object.keys(answerObj[category][newcategory]).forEach(question => {
                        if (answerObj[category][newcategory][question] === "false" || answerObj[category][newcategory][question] === "NA")
                            stats[category][newcategory]['no']++;
                        else if (answerObj[category][newcategory][question] === "true")
                            stats[category][newcategory]['yes']++;
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
