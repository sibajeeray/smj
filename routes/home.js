const path = require("path");
const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
    console.log(`/ GET got called. Rendering home`);
    res.render("home", {
        pageTitle: "Simplified Assessment Journey",
        path: "/",
        isLoggedin: req.session.email,
        errorMessage: null,
        user: req.session.username
    });
});

router.post('/logout', function (req, res, next) {

    console.log(`/logout GET got called. Rendering home`);
    req.session.destroy(err => {
        if(err){
          console.log(`******* Error Occured while destroying session *****`);
        }
        else
        console.log('Hello There');
          res.redirect(301,'/');
      });
    
});

// router.get("/", (req, res, next) => {
//     console.log(`/home GET got called. Rendering home`);
//     res.render("home", {
//         pageTitle: "Simplified Assessment Journey",
//         path: "/"
//     });
// });

router.get("/about-smj", (req, res, next) => {
    console.log(`/about-smj GET got called. Rendering about-smj`);
    res.render("about-smj", {
        pageTitle: "About SMJ",
        path: "/about",
        user: req.session.username,
    });
});

module.exports = router;