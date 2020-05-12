const express = require("express");
const router = express.Router();

// Welcome Page
router.get("/");

// Dashboard
router.get("/dashboard");

module.exports = router;
