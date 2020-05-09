const { HOST_URL } = require('../config/baseURL');
const asyncHandler = require('../middleware/async');
const {
  getMe,
  login,
  logout,
  register,
  forgotPassword,
} = require('../API/authRequests');

const { types } = require('@arcblock/mcrypto');
const {
  fromRandom,
  WalletType,
} = require('@arcblock/forge-wallet');
const { fromUnitToToken } = require('@arcblock/forge-util');
const GraphQLClient = require('@arcblock/graphql-client');

exports.getLogin = asyncHandler(async (req, res, next) => {
  res.render('login.ejs');
});

exports.postLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  try {
    let data = await login(req.body);
    const { success, token } = data;
    if (success) {
      data = await getMe(token);
      let user = data.data;
      if (user.role === 'user') {
        res.cookie('token', token, options).redirect('/users/dashboard');
      } else if (user.role === 'owner') {
        res.cookie('token', token, options).redirect('/hospitals/dashboard');
      } else {
        res.cookie('token', token, options).redirect('/admin/dashboard');
      }
    } else {
      res.redirect('/auth/login');
    }
  } catch (error) {
    console.log(error);
    if (error.response) {
      console.log(error.response.data.error);
      if (error.response.data.error === 'Invalid credentials') {
        req.flash('error_msg', 'Email or Password is incorrect');
      } else {
        req.flash('error_msg', error.response.data.error);
      }
      res.redirect('/auth/login');
    } else {
      res.render('login.ejs', { email, password });
    }
  }
});

exports.getRegister = asyncHandler(async (req, res, next) => {
  res.render('register.ejs');
});
exports.getUserRegister = asyncHandler(async (req, res, next) => {
  res.render('user-register');
});

exports.getHospitalOwnerRegister = asyncHandler(async (req, res, next) => {
  res.render('hospital-register.ejs');
});

exports.postRegister = asyncHandler(async (req, res, next) => {
  const { name, email, password, passwordConfirmation, role } = req.body;
  let errors = [];
  try {
    if (!name || !email || !password || !passwordConfirmation || !role) {
      errors.push({ msg: 'Please enter all fields' });
    }

    if (password != passwordConfirmation) {
      errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }
    if (errors.length > 0) {
      if (role === 'user') {
        res.render('user-register', {
          errors,
          name,
          email,
          password,
          passwordConfirmation,
        });
      } else {
		  res.render('hospital-register', {
			errors,
			name,
			email,
			password,
			passwordConfirmation,
		  })
	  }
    } else {
      if (role === 'user') {
      console.log("User registering")
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
      async function checkBalance(userName, userWallet) {
        const { state } = await client.getAccountState({
          address: userWallet.toAddress(),
        });
        console.log(`${userName}.balance`, fromUnitToToken(state.balance));
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
      const userName = name.split(' ').join("");
      const userWallet = fromRandom(type);
      let hash = await registerUser(userName,userWallet);
      console.log('Wallet is');
      console.log(userWallet.toJSON());
      console.log('\n')
      console.log('Hash is' + hash);
      console.log('\n')
      await getFreeToken(userWallet)
		  let user = await register({name, email, password, role, publicKey: userWallet.toJSON().pk});
		  const { success, data } = user;
		  if (success) {
			  req.flash('success_msg', 'You are now registered and can log in!');
        res.cookie(`${userName}-wallet`, userWallet.toJSON().sk, options).redirect('/auth/login');
		  }
	 } else {
	  let hospitalOwner = await register({name,email, password, role, publicKey: '1'});
		const { success, data } = hospitalOwner;
		if (success) {
			req.flash('success_msg', 'Login in to add a new hospital');
			res.redirect('/auth/login');
		}
	 }
    }
  } catch (error) {
    if(Array.isArray(error.errors)){
      console.log(err.errors)
    }
    if (error.response) {
      //req.flash('error_msg', error.response.data.error);
      console.log(error.response.data.error);
      if (error.response.data.error === 'Duplicate field value entered') {
        errors.push({ msg: 'Email already registered' });
      } else {
        errors.push({ msg: error.response.data.error });
      }
  }
  console.error(error)
	if (role === 'user') {
        res.render('user-register', {
          errors,
          name,
          email,
          password,
          passwordConfirmation,
        });
    } else {
		  res.render('hospital-register', {
			errors,
			name,
			email,
			password,
			passwordConfirmation,
		  })
	  }
  }
});
exports.getForgotPassword = asyncHandler(async (req, res, next) => {
  res.render('forgot-password.ejs');
});

exports.getLogout = asyncHandler(async (req, res, next) => {
  try {
    const data = await logout(req.cookies['token']);
    res.clearCookie('token');
    req.flash('success_msg', 'Logged out!');
    res.redirect('/auth/login');
  } catch (error) {
    if (error.response) {
      req.flash('error_msg', error.response.data.error);
    }
    res.redirect('/auth/login');
  }
  //let data = await
});
