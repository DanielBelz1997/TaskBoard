import express from "express";
const router = express.Router();
import {} from "../controllers/task.js";

router.get("/", getMembersDetails);

router.post("/", addMember);

router.patch("/", updateMember);

router.delete("/:memberId", deleteMember);

module.exports = router;
