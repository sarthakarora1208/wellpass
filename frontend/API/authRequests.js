const axios = require('axios');
const { AUTH } = require('../constants/routes');

exports.login = async (userData) => {
  try {
    const res = await axios.post(`${AUTH}/login`, userData);
    return res.data;
  } catch (err) {
    throw err;
  }
};

exports.getMe = async (token) => {
  try {
    const res = await axios.get(`${AUTH}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    //const { data } = res.data;
    return res.data;
  } catch (err) {
    throw err;
  }
};

exports.register = async (userData) => {
  try {
    const res = await axios.post(`${AUTH}/register`, userData);
    return res.data;
  } catch (err) {
    throw err;
  }
};

exports.logout = async (token) => {
  try {
    const res = await axios.get(`${AUTH}/logout`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

exports.updateDetails = async (userData) => {
  try {
    const res = await axios.put(`${AUTH}/updatedetails`, userData);
    return res.data;
  } catch (err) {
    throw err;
  }
};

//export async function updatePassword(userData) {
exports.updatePassword = async (userData) => {
  try {
    const res = await axios.put(`${AUTH}/updatepassword`, userData);
    return res.data;
  } catch (err) {
    throw err;
  }
};

exports.forgotPassword = async (userData) => {
  try {
    const res = await axios.post(`${AUTH}/forgotpassword`, userData);
    return res.data;
  } catch (err) {
    throw err;
  }
};

exports.resetPassword = async (userData, resetToken) => {
  try {
    const res = await axios.put(
      `${AUTH}/resetpassword/${resetToken}`,
      userData
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
