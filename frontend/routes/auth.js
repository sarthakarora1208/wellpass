const express = require('express');
const {
  getLogin,
  postLogin,
  getRegister,
  getUserRegister,
  getHospitalOwnerRegister,
  postRegister,
  postVerifyAddress,
  getForgotPassword,
  getLogout,
} = require('../controllers/auth');
// require('../../controllers/frontend/authFrontend');

const router = express.Router();

router.route('/login').get(getLogin).post(postLogin);
router.route('/register').get(getRegister).post(postRegister);
router.route('/forgot-pasword').get(getForgotPassword);
router.route('/logout').get(getLogout);
router.route('/user-register').get(getUserRegister)
router
  .route('/hospital-register')
  .get(getHospitalOwnerRegister)
router.route('/verify').post(postVerifyAddress);

module.exports = router;
