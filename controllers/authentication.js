const bcrypt = require('bcryptjs');

const crypto = require('crypto');
const { validationResult } = require('express-validator/check');
const config = require('../config/global/config.json');
const User = require('../models/user');
const Assesment = require('../models/assessment');

exports.validateAuth = async (req, res, next) => {
  const isNonSecureRoute = config.nonSecureRoutes.includes(req.path);
  if (isNonSecureRoute) next();
  else {
    try {
      const userId = req.session.userId ? req.session.userId : null;
      if (req.session.isLoggedIn && userId) {
        const user = await User.findById(userId)
        if (user && user._id && user.email) {
          req.user = user;
          next();
        }
        else res.redirect("/sign-up-in");
      }
      else {
        res.redirect("/sign-up-in");
      }
    }
    catch (err) {
      console.log("Error occured in validateAuth() :: ", err);
      res.redirect("/sign-up-in");
    }
  }
}

exports.postSignup = (req, res, next) => {
  console.log(req.body);
  const name = req.body.usernamesignup;
  const email = req.body.emailsignup;
  const password = req.body.passwordsignup;
  const confirmpassword = req.body.passwordsignup_confirm;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('error', errors.array()[0].msg);
    return res.redirect('/sign-up-in#toregister');
  }
  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        req.flash('error', 'E-Mail exists already, please pick a different one.');
        return res.redirect('/sign-up-in#toregister');
      }
      return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            name: name,
            email: email,
            password: hashedPassword,
            normalpwd: password
          });
          return user.save();
        })
        .then(result => {
          User.findOne({ email: email })
            .then(user => {
              req.session.isLoggedIn = true;
              req.session.userId = user._id;
              req.session.email = user.email;
              req.session.username = user.name;
              uesrname = req.session.username;
              res.render('tribe', { pageTitle: 'Enter Tribe Details', path: '/', user: uesrname, isAuthenticated: 'true', isLoggedin: 'true', errorMessage: null });
            })

        });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getLogin = (req, res, next) => {
  console.log(`/login GET got called. Inside getLogin MiddleWare`);

  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  console.log(`Rendering login`);

  res.render('login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message
  });
};

exports.postAdminLogin = (req, res, next) => {
  res.render('admin-tribe', { pageTitle: 'Admin Portal', path: '/login', errorMessage: null, user: 'abc@test.com' });
};

exports.getSignup = (req, res, next) => {

  console.log(`/sign-up-in GET got called. Inside getSignup MiddleWare`);

  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  console.log(`Rendering signup`);

  res.render('sign-up-in', {
    path: '/signup',
    pageTitle: 'Signup',
    isLoggedin: false,
    errorMessage: message
  });
};

exports.postLogin = (req, res, next) => {
  console.log(`/login_validation POST got called. Inside postLogin middleware`);
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  console.log(errors);

  if (!errors.isEmpty()) {
    return res.render('sign-up-in', {
      path: '/',
      pageTitle: 'Login',
      isLoggedin: false,
      errorMessage: errors.array()[0].msg
    });
  }
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        req.flash('error', 'Invalid email or password.');
        return res.redirect('/sign-up-in');
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.userId = user._id;
            req.session.email = user.email;
            req.session.username = user.name;
            /* Added new logic from here */

            Assesment.find({ email: req.session.email })
              .then(assessments => {
                if (assessments) {
                  console.log(assessments);
                  const count = assessments.length;
                  res.redirect('/survey');
                }
                else {
                  res.render('tribe', { pageTitle: 'Enter Tribe Details', path: '/tribe', user: user.name, isAuthenticated: 'true', errorMessage: null, isLoggedin: true });
                }

              })

          }

          else {
            req.flash('error', 'Invalid email or password.');
            res.redirect('/sign-up-in');
          }

        })
        .catch(err => {
          console.log(err);
          res.redirect('/sign-up-in');
        });
    })
    .catch(err => console.log(err));
};



exports.getLogout = (req, res, next) => {

  console.log(`/logout GET got called, inside getLogout middleware`);

  req.session.destroy(err => {
    if (err) {
      console.log(`******* Error Occured while destroying session *****`);
    }
    else
      res.render('home', { pageTitle: 'Home', path: '/', isLoggedin: 'false' });
  });

};

exports.getReset = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('reset', {
    path: '/reset',
    pageTitle: 'Reset Password',
    errorMessage: message
  });
};

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect('/reset');
    }
    const token = buffer.toString('hex');
    User.findOne({ email: req.body.email })
      .then(async (user) => {
        if (!user) {
          req.flash('error', 'No account with that email found.');
          return res.redirect('/reset');
        }
        user.resetToken = token;
        console.log(token);
        user.resetTokenExpiration = Date.now() + 3600000;
        user.save();

        userId = req.body.email;
        console.log(userId);

      })
      .then(result => {

        req.session.destroy(err => {
          if (err) {
            console.log(`******* Error Occured while destroying session *****`);
          }
          else

            res.redirect(301, '/');


          /* CODE FOR COMMUNICATING WITH PYTHON FOR EMAIL */

          const { spawn } = require('child_process');
          const pyProg = spawn(`D:\\RLS-Softwares(Do Not Delete)\\Python\\python.exe`, ['D:\\Virtualization-RLS\\SMJ\\Simplified Assessment Journey_v0.6\\Email2_Util.py', token, userId]);

          pyProg.stdout.on('data', function (data) {

            console.log(data.toString());
            // res.write(data);
            // res.end('end');
          });
          /* CODE FOR COMMUNICATING WITH PYTHON FOR EMAIL */
        });

      })
      .catch(err => {
        console.log(err);
      });
  });
};

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  console.log(req.session.csrfSecret);
  User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    .then(user => {
      let message = req.flash('error');
      console.log(user._id.toString());
      if (message.length > 0) {
        message = message[0];
      } else {
        message = null;
      }
      res.render('new-password', {
        path: '/new-password',
        pageTitle: 'New Password',
        errorMessage: message,
        userId: user._id.toString(),
        passwordToken: token
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;
  let resetUser;
  User.findOne({
    resetToken: passwordToken,
    resetTokenExpiration: { $gt: Date.now() },
    _id: userId
  })
    .then(user => {
      resetUser = user;
      return bcrypt.hash(newPassword, 12);
    })
    .then(hashedPassword => {
      resetUser.password = hashedPassword;
      resetUser.normalpwd = newPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
    })
    .then(result => {
      res.redirect('/sign-up-in#tologin');
    })
    .catch(err => {
      console.log(err);
    });
};
