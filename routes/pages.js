const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
     res.render('index')
 });

 router.get('/register', (req, res) => {
    var message="";
     res.render('register', {message: message})
 });

 router.get('/auth/register', (req, res) => {
    var message="";
     res.render('register', {message: message})
 });

router.get('/login', (req, res) => {
    var message="";
    res.render('login', {message: message})
})

 module.exports = router;