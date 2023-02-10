import express from "express";
import { signIn, checkLoginStatus } from "../controllers/auth";

const router = express.Router();

router.post("/sign_in", signIn);
router.get("/check", checkLoginStatus);

export default router;
