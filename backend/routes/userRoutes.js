const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const logMiddleware = require("../middlewares/logMiddleware");
const userService = require("../controllers/userService");

router.get("/weather/:city/:country/:date", userController.getAllplaces);

router.post("/register", userService.registerUser);
router.post("/login", userService.loginUser);
router.post("/logout", userService.logoutUser);

module.exports = router;
