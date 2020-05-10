const express = require('express');
const {
	getAddHospital,
	getAddPatientData,
	postAddHospital,
	postAddPatientData,
	getGenerateKeysForHospital,
	dashboard
} = require('../controllers/hospital');
// require('../../controllers/frontend/hospitalFrontend');
const { checkIfAuthenticated } = require('../middleware/auth');
// require('../../middleware/authFrontend');

const router = express.Router();

router.route('/dashboard').get(checkIfAuthenticated, dashboard);


router.route('/add-hospital').get(checkIfAuthenticated, getAddHospital).post(postAddHospital);

router.route('/:hospitalName/generate-keys').get(checkIfAuthenticated, getGenerateKeysForHospital);

router.route('/:hospitalName/:id/add-patient-data').get(checkIfAuthenticated, getAddPatientData).post(postAddPatientData);

module.exports = router;
