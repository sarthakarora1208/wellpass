const asyncHandler = require('../../middleware/async');
const {
  getPatientDataRequests,
  getPatientDataRequestById,
  approvePatientDataRequest,
  addDataToSheet,
} = require('../../API/patientDataRequests');
const {
  getHospitalForUser,
  addHospital,
} = require('../../API/hospitalRequests');
const { getMe } = require('../../API/authRequests');

exports.dashboard = asyncHandler(async (req, res, next) => {
  let pdRequests = [];

  try {
    const token = req.cookies['token'];
    const userData = await getMe(token);
    let user = userData.data;
    let data = await getHospitalForUser(token);
    // if already has made a request
    if (data.length === 1) {
      const hospital = data[0];
      data = await getPatientDataRequests(hospital.id);
      pdRequests = [...data];

      res.render('hospital-dashboardNext.ejs', {
        user,
        pdRequests,
        hospital,
      });
    } else {
      res.render('hospital-dashboard.ejs', { user });
    }
  } catch (error) {
    console.log(error);
    if (error.response) {
      req.flash('error_msg', error.response.data.error);
    }
    res.redirect('/auth/login');
  }
});

exports.getAddHospital = asyncHandler(async (req, res, next) => {
  const userData = await getMe(req.cookies['token']);
  let user = userData.data;
  res.render('add-hospital', { user });
});

exports.postAddHospital = asyncHandler(async (req, res, next) => {
  const {
    name,
    description,
    registrationNumber,
    website,
    phone,
    email,
    address,
    publicKey,
  } = req.body;
  let errors = [];
  try {
    if (
      !name ||
      !description ||
      !registrationNumber ||
      !website ||
      !phone ||
      !email ||
      !address
    ) {
      errors.push({ msg: 'Please enter all fields' });
    }

    if (errors.length > 0) {
      req.flash('error_msg', errors[0]);
      res.redirect('/hospitals/add-hospital');
    } else {
      let data = await addHospital(req.body, req.cookies['token']);
      req.flash('success_msg', 'Hospital Added Successfully');
      res.redirect('/hospitals/dashboard');
    }
  } catch (error) {
    if (error.response) {
      if (error.response.data.error === 'Duplicate field value entered') {
        errors.push({ msg: 'Hospital Name already registered' });
      } else {
        errors.push({ msg: error.response.data.error });
      }
    }
    req.flash('error_msg', errors[0]);
    res.redirect('/hospitals/add-hospital');
  }
});

exports.getAddPatientData = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const userData = await getMe(req.cookies['token']);
    let hospitalOwner = userData.data;
    console.log(hospitalOwner)
    const data = await getPatientDataRequestById(id);
    const { user, comment, hospital } = data;
    console.log('');
    res.render('add-patient-data.ejs', {
      id,
      user,
      comment,
      hospital,
      owner: hospitalOwner,
    });
  } catch (error) {
    if (error.response) {
      req.flash('error_msg', error.response.data.error);
    }
    res.redirect('/hospitals/dashboard');
  }
});

exports.postAddPatientData = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    const data = await approvePatientDataRequest(id, req.cookies['token']);
    req.flash('success_msg', 'Request approved for patient');
    res.redirect('/hospitals/dashboard');
  } catch (error) {
    if (error.response) {
      req.flash('error_msg', error.response.data.error);
    }
    res.redirect('/hospitals/dashboard');
  }
});
