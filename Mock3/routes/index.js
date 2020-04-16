const express = require('express');
const router = express.Router();
const passport = require('passport')

router.get('/',require('../controllers/userController').signup);
router.get('/user/signin',require('../controllers/userController').signin)

router.post('/user/createUser',require('../controllers/userController').createUser);
router.post('/user/createSession',passport.authenticate(
    'local',
    {failureRedirect:'/'}
),require('../controllers/userController').createSession);

router.get('/user/user-detail',passport.checkAuthetication,require('../controllers/userController').userDetail);
router.get('/user/signout',require('../controllers/userController').signout);


module.exports = router;