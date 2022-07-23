const express = require("express");
const { requireSignin, adminMiddleware } = require("../commom-middleware");

const { addCategory, getCategories } = require("../controller/category");
const router = express.Router();

router.post("/category/cerate", requireSignin, adminMiddleware, addCategory);
router.get("/category/getCategory", getCategories);

module.exports = router;
