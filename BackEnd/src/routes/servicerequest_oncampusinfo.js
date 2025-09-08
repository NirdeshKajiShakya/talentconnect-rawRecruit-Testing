import express from "express";
import { submitRequest } from "../controllers/servicerequest_oncampusinfo.js";

const router = express.Router();

router.post("/request-on-campus", submitRequest);

export default router;
