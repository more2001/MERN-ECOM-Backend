//Creating token and saving in cookie

const sendToken = (user, statusCode, res) => {
  const ecom_tkn = user.getJWTToken();

  // options fpr cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true
  };

  res.status(statusCode).cookie("ecom_tkn", ecom_tkn, options).json({
    success: true,
    ecom_tkn,
  });
};

module.exports = sendToken;
