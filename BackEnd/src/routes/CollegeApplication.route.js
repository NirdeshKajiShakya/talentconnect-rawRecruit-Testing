import express from "express";
import { AcceptCampusRequest, getAcceptedCampusRequest } from "../controllers/collegeApplication.controller.js";

const router = express.Router();

// api '.../college/application'
router.post('/',AcceptCampusRequest);
router.get('/:companyId',getAcceptedCampusRequest);



export default router;