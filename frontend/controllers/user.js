const asyncHandler = require('../../middleware/async');
const {
  getPatientDataRequestForUser,
  addPatientDataRequest,
  deletePatientDataRequestById,
} = require('../../API/patientDataRequests');
const { getApprovedHospitals } = require('../../API/hospitalRequests');
const { getMe } = require('../../API/authRequests');

exports.dashboard = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies['token'];
    const userData = await getMe(token);
    let user = userData.data;

    let data = await getPatientDataRequestForUser(token);
    // if already has made a request
    if (data.length === 1) {
      res.render('user-dashboardNext.ejs', {
        user,
        pdRequest: data[0],
        timeStamp: new Date(Date.parse(data[0].createdAt))
          .toUTCString()
          .slice(0, 16),
      });
    } else {
      // if the request is not made yet

      res.render('user-dashboardFirst.ejs', { user });
    }
  } catch (error) {
    console.log(error);
    if (error.response) {
      req.flash('error_msg', error.response.data.error);
      res.redirect('/auth/login');
    }
  }
});

exports.getRequestData = asyncHandler(async (req, res, next) => {
  let hospitals = [];
  try {
    const userData = await getMe(req.cookies['token']);
    let user = userData.data;
    let data = await getApprovedHospitals();
    hospitals = [...data.data];
    res.render('user-request-data.ejs', {
      user,
      hospitals,
    });
  } catch (error) {
    console.log(error);
    if (error.response) {
      req.flash('error_msg', error.response.data.error);
      res.redirect('/users/dashboard');
    }
  }
});

exports.postRequestData = asyncHandler(async (req, res, next) => {
  const { hospitalId, comment } = req.body;
  console.log('Hospital Id' + hospitalId);
  try {
    let data = await addPatientDataRequest(
      hospitalId,
      { comment },
      req.cookies['token']
    );
    console.log(data);
    req.flash('success_msg', 'Request made successfully!');
    res.redirect('/users/dashboard');
  } catch (error) {
    console.log(error);
    if (error.response) {
      req.flash('error_msg', error.response.data.error);
      res.redirect('/users/request-data');
    }
  }
});
exports.deleteRequestData = asyncHandler(async (req,res,next) => {
  try {

      let data = await getPatientDataRequestForUser(req.cookies['token']);
      const responseData = await deletePatientDataRequestById(data[0]._id,req.cookies['token']);

      res.redirect('/users/dashboard')
  } catch (error){
    console.log(error);
    if (error.response) {
      req.flash('error_msg', error.response.data.error);
      res.redirect('/users/dashboard');
    }
  }
})
