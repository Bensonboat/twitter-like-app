import express from "express";
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  follow,
  unFollow,
} from "../controllers/user";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.get("/users", getUsers);
router.get("/user/:user_id", getUser);
router.post("/user", createUser);

router.put("/user/:user_id", verifyToken, updateUser);
router.delete("/user/:user_id", verifyToken, deleteUser);
router.put("/user/:user_id/follow", verifyToken, follow);
router.put("/user/:user_id/un_follow", verifyToken, unFollow);

export default router;
