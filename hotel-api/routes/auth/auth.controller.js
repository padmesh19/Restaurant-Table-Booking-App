const uuidv4 = require('uuid/v4');

const User = require('../models/user.model');

const hotelDetail = require('../models/orgDetail.model');

const authHelper = require('../../utils/auth');

const stringHelper = require('../../utils/stringHelper');

const sendEmail = require('../../utils/sendMail');

const login = async (req, res) => {
  if (!req.body.us_email || !req.body.us_password) {
    return res.status(400).json({
      message: !req.body.us_email
        ? 'Enter your email address.'
        : 'Enter your password.',
      field: !req.body.us_password ? 'password' : 'email',
      status: false,
    });
  }

  try {
    const user = await User.findOne({
      email: req.body.us_email,
      is_login: true,
    });
    console.log(user);

    // await authHelper.comparePasswords(req.body.us_password, user.password);

    // if (user.is_active !== 1) {
    //   const url = `<p>Click the link to verify your account</p> - ${process.env.ROOT}/verify/${user.user_id}`;
    //   await sendEmail(user.email, 'Verify Email', url);

    //   return res.status(403).json({
    //     status: false,
    //     message: 'Your account not verified.Check your mail',
    //   });
    // }

    const token = authHelper.createJWTToken(user);

    const organisation = await hotelDetail.find({
      hotel_user_id: user.user_id,
    });

    const loginUser = {
      user_id: user.user_id,
      us_email: user.email,
      userProfile: user,
      ...user,
      organisation,
    };

    return res.status(200).send({
      status: true,
      message: 'Successfully logged in',
      token,
      user: loginUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      status: false,
      message: 'The email address or password is incorrect.',
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    if (!req.body.us_email) {
      return res.status(400).json({
        message: 'Enter your email address.',
        field: 'email',
        status: false,
      });
    }
    const user = await User.findUser({
      email: req.body.us_email,
    });

    if (user) {
      const url = `<p>Click the link to reset password to your account</p> - ${process.env.ROOT}/password-reset/${user.user_id}`;

      await sendEmail(user.email, 'Reset password', url);
    }

    return res.status(200).json({
      status: true,
      message: 'Successfully send reset email.',
      user,
    });
  } catch (error) {
    console.log(error.message);
    const message =
      error.message === 'EmptyResponse'
        ? "Couldn't find your account."
        : 'Something went wrong.';

    return res.status(400).json({
      message,
      field: 'email',
      status: false,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    if (req.body.password.length < 8) {
      return res.status(400).json({
        error: 'Password must be at least 8 characters.',
        field: 'password',
        status: false,
      });
    }

    if (req.body.password !== req.body.c_password) {
      return res.status(400).json({
        error: 'Confirm password mismatch',
        field: 'confirmpassword',
        status: false,
      });
    }

    const { id } = req.body;

    const { password, salt } = await authHelper.encryptPassword(
      req.body.password
    );

    // update user with the new pasword
    await User.updateUser(
      { user_id: id, is_active: 1 },
      {
        password: password,
        password_salt: salt,
      }
    );

    return res.status(200).json({
      status: true,
      message: 'Successfully updated password',
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: 'Failed resetting password.',
    });
  }
};

const registerOrgAdmin = async (req, res) => {
  try {
    const userExists = await User.find({
      email: req.body.email,
    });

    if (userExists) {
      return res.status(400).json({
        message:
          'The email address you entered is already used by another person',
        field: 'email',
        status: false,
      });
    }
    if (req.body.password !== req.body.c_password) {
      return res.status(400).json({
        message: 'passwords are not match ',
        field: 'password',
        status: false,
      });
    }
    if (req.body.org_type === 'Hotel') {
      const orgExists = await hotelDetail.find({
        hotel_name: req.body.restaurant_name,
      });

      if (orgExists) {
        return res.status(422).json({
          status: false,
          message:
            'The hotel name you entered is already used by another person',
        });
      }
    }
    // create user
    const { password, salt } = await authHelper.encryptPassword(
      req.body.password
    );
    // split fullname into first & last name.
    const { firstName, lastName } = stringHelper.splitNameFromFullName(
      req.body.full_name
    );

    const user = await User.createUser({
      user_id: uuidv4(),
      email: req.body.email,
      user_address: `${req.body.state_name}, ${req.body.district_name}`,
      user_type: req.body.org_type === 'Hotel' ? 1 : 2,
      first_name: firstName,
      last_name: lastName,
      password: password,
      password_salt: salt,
      user_avatar: req.body.imgLoca,
    });

    if (user.user_type === 1) {
      const details = {
        hotel_id: uuidv4(),
        address: `${req.body.state_name}, ${req.body.district_name}`,
        hotel_name: req.body.restaurant_name,
        hotel_user_id: user?.user_id,
      };
      const org = await hotelDetail.createHotel(details);
    }

    const url = `<p>Click the link to verify your account</p> - ${process.env.ROOT}/verify/${user.user_id}`;

    await sendEmail(user.email, 'Verify Email', url);
    // create org

    return res
      .status(200)
      .json({ status: true, message: 'User registered successfully.' });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ status: false, message: 'Registration failed.' });
  }
};

const verifyUser = async (req, res) => {
  try {
    // activate user
    const { userId } = req.params;
    const user = await User.findUser({
      user_id: userId,
      is_active: 0,
    });

    if (user) {
      await User.updateUser(
        {
          user_id: userId,
        },
        {
          is_active: 1,
        }
      );
    }

    return res.status(200).send({
      status: true,
      message: 'Verified Succesfully',
    });
  } catch (error) {
    return res
      .status(400)
      .json({ status: false, message: 'Verification failed.Invalid token.' });
  }
};

module.exports = {
  login,
  forgotPassword,
  resetPassword,
  registerOrgAdmin,
  verifyUser,
};
