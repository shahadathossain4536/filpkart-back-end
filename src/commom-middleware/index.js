const express = require("express");
var jwt = require("jsonwebtoken");

exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token);
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
  } else {
    return res.status(400).json({ message: "Authorization required" });
  }

  next();
};

exports.adminMiddleware = (req, res, next) => {
  //   const user = req.user.role;
  //   console.log(user);

  if (req.user.role !== "admin") {
    return res.status(400).json({ message: "Access denied" });
  }

  next();
};
