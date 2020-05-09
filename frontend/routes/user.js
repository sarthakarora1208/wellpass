const express = require('express');
const { dashboard, getRequestData, postRequestData, deleteRequestData } = require('../controllers/user');
//  require('../../controllers/frontend/userFrontend');
const { checkIfAuthenticated } = require('../middleware/auth');
// require('../../middleware/authFrontend');

const router = express.Router();

router.route('/delete-request').post(deleteRequestData);
router.route('/dashboard').get(checkIfAuthenticated, dashboard);
router.route('/request-data').get(checkIfAuthenticated, getRequestData).post(postRequestData);
module.exports = router;
