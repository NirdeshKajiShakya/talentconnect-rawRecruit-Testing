import express from "express";
import { registerOffCampus } from "../controllers/servicerequest_offcampusregister.js";

const router = express.Router();
router.post("/offcampus/register", registerOffCampus);
export default router;
