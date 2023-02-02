import express from "express";
import { signIn } from "../controllers/auth";

const router = express.Router();

router.post("/sign_in", signIn);

export default router;
