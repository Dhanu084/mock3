const express = require('express');
const router = express.Router();

router.get('/',require('../controllers/homeController').home);
router.post('/upload',require('../controllers/homeController').upload);
router.get('/read/:id',require('../controllers/homeController').read);

module.exports = router;