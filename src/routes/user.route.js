import express from "express";

const router = express.Router();
import {
    registerUser,
    loginUser,
    loginUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
} from "../controllers/user.controller.js";

router.get("/register");