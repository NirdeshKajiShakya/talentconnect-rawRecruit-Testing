import express from "express";
import { submitOffCampusInfo } from "../controllers/servicerequest_offcampusinfo.js";

const router = express.Router();
router.post("/offcampus/info", submitOffCampusInfo);
export default router;
