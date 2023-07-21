const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPasswordUser,
  resetPasswordUser,
  getUserDetails,
  updateUserPassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
  getLoggedInStatus,
} = require("../controllers/userController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

//user Routes
router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);

router.route("/getstatus").get(getLoggedInStatus);

router.route("/password/forgotpassword").post(forgotPasswordUser);

router.route("/password/resetpassword/:token").put(resetPasswordUser);

router
  .route("/password/changepassword")
  .put(isAuthenticatedUser, updateUserPassword);

router.route("/user").get(isAuthenticatedUser, getUserDetails);

router.route("/user/updateprofile").put(isAuthenticatedUser, updateProfile);


//Admin routes
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);


module.exports = router;