const express= require('express');

const router= express.Router();

router.get('/login', (req,res,next) =>{
    res.render('login',{pageTitle : 'Admin Portal', path:'/login'});
})

router.post('/admin-validation', (req,res,next) =>{
    res.render('admin-tribe',{pageTitle : 'Admin Portal', path:'/login', errorMessage:null});
})

module.exports= router;