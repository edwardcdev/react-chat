const httpStatus = require('http-status');
const moment = require('moment-timezone');
const nodemailer = require('nodemailer');
const User = require('../models/user.model');
const RefreshToken = require('../models/refreshToken.model');
const Workspace = require('../models/workspace.model');
const Channel = require('../models/channel.model');
const config = require('../../config');
const APIError = require('../utils/APIError');

const generateTokenResponse = (user, accessToken) => {
  const tokenType = 'Bearer';
  const refreshToken = RefreshToken.generate(user).token;
  const expiresIn = moment().add(config.jwtExpirationInterval, 'minutes');
  return {
    tokenType, accessToken, refreshToken, expiresIn,
  };
};

exports.register = async (req, res, next) => {
  try {
    const workspaceId = req.body.workspace;
    const workspace = await Workspace.findById(workspaceId).exec();
    const user = await (new User(req.body)).save();
    await Channel.joinMainChannel(workspace._id, user);
    const userTransformed = user.transform();
    const token = generateTokenResponse(user, user.token());
    res.status(httpStatus.CREATED);
    return res.json({ token, user: userTransformed });
  } catch (error) {
    return next(User.checkDuplicateEmail(error));
  }
};

exports.login = async (req, res, next) => {
  try {
    const workspaceId = req.body.workspace;
    const workspace = await Workspace.findById(workspaceId).exec();
    const { user, accessToken } = await User.findAndGenerateToken(workspace._id, req.body);
    const token = generateTokenResponse(user, accessToken);
    const userTransformed = user.transform();
    return res.json({ token, user: userTransformed });
  } catch (error) {
    return next(error);
  }
};

exports.refresh = async (req, res, next) => {
  try {
    const { email, refreshToken } = req.body;
    const refreshObject = await RefreshToken.findOneAndRemove({
      userEmail: email,
      token: refreshToken,
    });
    const { user, accessToken } = await User.findAndGenerateToken({ email, refreshObject });
    const response = generateTokenResponse(user, accessToken);
    return res.json(response);
  } catch (error) {
    return next(error);
  }
};

exports.confirm = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    const err = {
      status: httpStatus.UNAUTHORIZED,
      isPublic: true,
    };
    if (!user) {
      err.message = 'There is no user registered';
    } else {
      const workspace = await Workspace.findById(user.workspace).exec();
      if (!workspace) {
        err.message = 'There is no workspace registered';
      } else {
        await sendEmail(email, workspace);
        return res.json({ success: true });
      }
    }
    throw new APIError(err);
  } catch (error) {
    return next(error);
  }
};

const sendEmail = (email, workspace) => {
  nodemailer.createTestAccount((err, account) => {

    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: account.user, // generated ethereal user
            pass: account.pass // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Chatting App" <no-reply@example.com>', // sender address
        to: email, // list of receivers
        subject: 'Workspace URL', // Subject line
        text: "http://0.0.0.0:3000/" + workspace.displayName, // plain text body
        html: '<a href="http://0.0.0.0:3000/' + workspace.displayName + '">' + workspace.fullName + '</a>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
  });
}
