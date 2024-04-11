const express = require("express");
const User = require("../model/user");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const jwt = require("jsonwebtoken");
const path = require("path");
const { uploads } = require("../multer");

router.post("/create-user", uploads.single("file"), async (req, res, next) => {
  const { name, email, password } = req.body;
  const userEmail = await User.findOne({ email });

  if (userEmail) {
    return next(new ErrorHandler("Email existe déjà", 400));
  }

  const filename = req.file.filename;
  const fileUrl = path.join(filename);

  const avatar = fileUrl;

  const user = {
    name: name,
    email: email,
    password: password,
    avatar: fileUrl,
  };

  const newUser = await User.create(user);
  res.status(201).json({
    success: true,
    user: newUser,
  });
});

module.exports = router;
