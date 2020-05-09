const axios = require('axios');
const { HOSPITALS, PDREQUESTS } = require('../constants/routes');

exports.getPatientDataRequests = async (hospitalId) => {
	try {
		const res = await axios.get(`${HOSPITALS}/${hospitalId}/pdrequests`);
		const { data } = res.data;
		return data;
	} catch (err) {
		throw err;
	}
};

exports.getPatientDataRequestById = async (id) => {
	try {
		const res = await axios.get(`${PDREQUESTS}/${id}`);
		const { data } = res.data;
		return data;
	} catch (err) {
		throw err;
	}
};

exports.deletePatientDataRequestById = async (id, token) => {
	try {
		console.log(id);
		const res = await axios.delete(`${PDREQUESTS}/${id}`, {
			headers: { Authorization: `Bearer ${token}` }
		});
		const { data } = res.data;
		return data;
	} catch (err) {
		throw err;
	}
};

exports.addPatientDataRequest = async (hospitalId, patientData, token) => {
	try {
		const res = await axios.post(`${HOSPITALS}/${hospitalId}/pdrequests`, patientData, {
			headers: { Authorization: `Bearer ${token}` }
		});
		const { data } = res.data;
		return data;
	} catch (err) {
		throw err;
	}
};

exports.getPatientDataRequestForUser = async (token) => {
	try {
		const res = await axios.get(`${PDREQUESTS}/user`, {
			headers: { Authorization: `Bearer ${token}` }
		});
		const { data } = res.data;
		return data;
	} catch (err) {
		throw err;
	}
};

exports.approvePatientDataRequest = async (patientDataRequestId, token) => {
	try {
		const res = await axios({
			method: 'put',
			url: `${PDREQUESTS}/${patientDataRequestId}/approve`,
			headers: { Authorization: `Bearer ${token}` }
		});
		const { data } = res.data;
		return data;
	} catch (err) {
		throw err;
	}
};
exports.addDataToSheet = async (patientDataRequestId) => {
	try {
		const res = await axios({
			method: 'put',
			url: `${PDREQUESTS}/${patientDataRequestId}/addtosheets`,
			headers: { Authorization: `Bearer ${token}` }
		});
		const { data } = res.data;
		return data;
	} catch (err) {
		throw err;
	}
};
