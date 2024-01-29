var express = require('express');
const router = express.Router();



var usersController = require('../controllers/usersController');


router.route('/login').post(usersController.loginUserControllerFn);
router.route('/register').post(usersController.createusersControllerFn);
router.route('/api').post(usersController.GetresponseApi);



module.exports = router;