
const path = require('path')
const express= require('express');
const bodyParser= require('body-parser');
const mongoose= require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const dbConfig = require('./config/dev/db.json');
const authController = require('./controllers/authentication');

//mongodb://GLOBALTEST\beheras4admin:Zxcvbn%40123456@10.52.244.3:27017/SMJ

//mongodb://localhost:27017/SMJ
const MONGODB_URI = dbConfig.db_url;
const app= express();

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

const homeroute = require('./routes/home');
const authRoutes = require('./routes/auth');
const surveyRoutes = require('./routes/survey');
const tribeRoute = require('./routes/tribe');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: 'volar morghulis',
    resave: false,
    saveUninitialized: false,
    store: store
    // cookie:{maxAge: 6000}
  })
);
app.use(csrfProtection);
app.use(flash());



app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(authController.validateAuth);

// app.use((req, res, next) => {
//   if (!req.session.user) {
//     return next();
//   }
//   User.findById(req.session.user._id)
//     .then(user => {
//       req.user = user;
//       req.session.username = user.name;
//       console.log(req.user);
//       console.log("***********");
//       console.log(user);
//       console.log("***********");
      
//       next();
//     })
//     .catch(err => console.log(err));
// });

app.use('/logout',authRoutes);
app.use(homeroute);
app.use(authRoutes);
app.use('/survey', surveyRoutes);
app.use(tribeRoute);


app.use((req,res,next) =>{
    res.status(404).render('notfound', {pageTitle : 'Page Not Found', path:'/'});
});

mongoose
  .connect(
    MONGODB_URI ,{useNewUrlParser: true}
  )
  .then(result => {
    app.listen(5001);
    console.log("Listening at port 5001");
  })
  .catch(err => {
    console.log(err);
  });
