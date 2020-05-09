const axios = require('axios');
const { HOSPITALS } = require('../constants/routes');

exports.getHospitals = async () => {
  try {
    const res = await axios.get(`${HOSPITALS}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

exports.getApprovedHospitals = async () => {
  try {
    const res = await axios.get(`${HOSPITALS}/approved`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

exports.getUnapprovedHospitals = async () => {
  try {
    const res = await axios.get(`${HOSPITALS}/unapproved`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

exports.getHospitalById = async (id) => {
  try {
    const res = await axios.get(`${HOSPITALS}/${id}`);
    const { data } = res.data;
    return data;
  } catch (err) {
    throw err;
  }
};

exports.addHospital = async (hospitalData, token) => {
  try {
    const res = await axios.post(`${HOSPITALS}`, hospitalData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { data } = res.data;
    return data;
  } catch (err) {
    throw err;
  }
};

exports.updateHospital = async (hospitalId, hospitalData, token) => {
  try {
    const res = await axios.put(`${HOSPITALS}/${hospitalId}`, hospitalData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { data } = res.data;
    return data;
  } catch (err) {
    throw err;
  }
};

exports.getHospitalForUser = async (token) => {
  try {
    const res = await axios.get(`${HOSPITALS}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { data } = res.data;
    return data;
  } catch (err) {
    throw err;
  }
};

exports.approveHospital = async (hospitalId, token) => {
  try {
    const res = await axios({
      method: 'put',
      url: `${HOSPITALS}/${hospitalId}/approve`,
      headers: { Authorization: `Bearer ${token}` },
    });
    const { data } = res.data;
    return data;
  } catch (err) {
    throw err;
  }
};
