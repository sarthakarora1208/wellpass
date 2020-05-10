const { HOST_URL } = require('../config/baseURL');
const asyncHandler = require('../middleware/async');
const {
	getPatientDataRequests,
	getPatientDataRequestById,
	approvePatientDataRequest,
	addDataToSheet
} = require('../API/patientDataRequests');
const { getHospitalForUser, addHospital } = require('../API/hospitalRequests');
const { getMe } = require('../API/authRequests');
const { types } = require('@arcblock/mcrypto');
const {
  fromRandom,
  WalletType,
  fromPublicKey,
  fromSecretKey
} = require('@arcblock/forge-wallet');
const GraphQLClient = require('@arcblock/graphql-client');



exports.dashboard = asyncHandler(async (req, res, next) => {
	let pdRequests = [];

	try {
		const token = req.cookies['token'];
		const userData = await getMe(token);
		let user = userData.data;
		let data = await getHospitalForUser(token);
		// if already added a hospital
		if (data.length === 1) {
			let hospitalHasKeys;
			const hospital = data[0];

			let cookie = req.cookies[`${hospital.name.split(' ').join("")}-hospital-wallet`]

			if(typeof cookie !== 'undefined'){
				hospitalHasKeys = true;
			}

			data = await getPatientDataRequests(hospital.id);
			pdRequests = [ ...data ];

			res.render('hospital-dashboard-next.ejs', {
				user,
				pdRequests,
				hospital,
				hospitalHasKeys
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
	const { name, description, registrationNumber, website, phone, email, address, publicKey } = req.body;
	let errors = [];
	try {
		if (!name || !description || !registrationNumber || !website || !phone || !email || !address) {
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
		console.log(hospitalOwner);
		const data = await getPatientDataRequestById(id);
		const { user, comment, hospital } = data;
		const patientWallet = fromPublicKey(user.publicKey);
		const patientAddress = patientWallet.toJSON().address;
		res.render('add-patient-data.ejs', {
			id,
			user,
			comment,
			hospital,
			owner: hospitalOwner,
			patientAddress
		});
	} catch (error) {
		if (error.response) {
			req.flash('error_msg', error.response.data.error);
		}
		res.redirect('/hospitals/dashboard');
	}
});

exports.postAddPatientData = asyncHandler(async (req, res, next) => {
	const { hospitalName,id } = req.params;
	console.log(hospitalName)
	console.log(id);
	const {patientAddress, reportData} = req.body;
	console.log("INSIDE GET PATIENT DATA");
	console.log(patientAddress);
	console.log(reportData);
    const client = new GraphQLClient({ endpoint: `${HOST_URL}/api` });
	const sleep = (timeout) =>
	  new Promise((resolve) => setTimeout(resolve, timeout));

	try {
		const secretKey = req.cookies[`${hospitalName}-hospital-wallet`];
		const hospitalWallet = fromSecretKey(secretKey);
		console.log(hospitalWallet.toJSON());
		let assetAddress;
		let hash;

		[hash, assetAddress] = await client.createAsset({
			moniker: `${hospitalName}`,
			data: {
			  typeUrl: 'json',
			  value: {
				sn: Math.random(), // To make this asset uniq every time this script runs
				report: reportData,
			  },
			},
			wallet: hospitalWallet,
			readonly: true,
		  });
		hash = await client.transfer({
			to: patientAddress,
			assets: [assetAddress],
			wallet: hospitalWallet,
			memo: 'sending in patient data',
		});
		await sleep(3000);
		let { state } = await client.getAssetState({ address: assetAddress });
		console.log('asset state', state);
		await approvePatientDataRequest(id, req.cookies['token']);
		await req.flash('success_msg', 'Request approved for patient');
		res.render('patient-data-success',{ assetAddress,patientAddress });
	} catch (error) {
		console.log(error)
		if (error.response) {
			req.flash('error_msg', error.response.data.error);
		}
		res.redirect('/hospitals/dashboard');
	}
});


exports.getGenerateKeysForHospital = asyncHandler(async (req, res, next) => {
	const { hospitalName }  = req.params
    const client = new GraphQLClient({ endpoint: `${HOST_URL}/api` });
      const sleep = (timeout) =>
	  new Promise((resolve) => setTimeout(resolve, timeout));

      function registerUser(userName, userWallet) {
        return client.declare({
          moniker: userName,
          wallet: userWallet,
        });
      }
      function getFreeToken(userWallet) {
        return client.checkin({
          wallet: userWallet,
        });
      }

      const options = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      if (process.env.NODE_ENV === 'production') {
        options.secure = true;
      }
      const type = WalletType({
        role: types.RoleType.ROLE_ACCOUNT,
        pk: types.KeyType.ED25519,
        hash: types.HashType.SHA3,
	  });

	  const hospitalWallet = fromRandom(type);

	  let hash = await registerUser(hospitalName,hospitalWallet);

      console.log('Wallet is');
      console.log(hospitalWallet.toJSON());
      console.log('\n')
      console.log('Hash is' + hash);
	  console.log('\n')

	  await getFreeToken(hospitalWallet)

	  await sleep(3000);

	  const {sk,pk,address} = hospitalWallet.toJSON();

      res.cookie(`${hospitalName}-hospital-wallet`, hospitalWallet.toJSON().sk, options).render('display-keys',{privateKey:sk, publicKey: pk, address });

});