const user = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { ecom_tkn } = req.cookies;

  if (!ecom_tkn) {
    next(
      new ErrorHandler("Unauthorized access Please login!", 401)
    );
  }

  const decodedData = jwt.verify(ecom_tkn, process.env.JWT_SECRET);

  req.user = await user.findById(decodedData.id);
  
  next();
});


exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};
