const asyncHandler = require('../../middleware/async');
const {
  getUnapprovedHospitals,
  approveHospital,
} = require('../../API/hospitalRequests');
const { getMe } = require('../../API/authRequests');

exports.dashboard = asyncHandler(async (req, res, next) => {
  let hospitals = [];
  try {
    const userData = await getMe(req.cookies['token']);
    let user = userData.data;
    const data = await getUnapprovedHospitals();
    hospitals = [...data.data];
    res.render('admin-dashboard.ejs', {
      user,
      hospitals,
    });
  } catch (error) {
    if (error.response) {
      req.flash('error_msg', error.response.data.error);
    }
    res.redirect('/auth/login');
  }
});

exports.approveHospital = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await approveHospital(id, req.cookies['token']);
    res.redirect('/admin/dashboard');
  } catch (error) {
    if (error.response) {
      req.flash('error_msg', error.response.data.error);
    }
    res.redirect('/admin/dashboard');
  }
});
