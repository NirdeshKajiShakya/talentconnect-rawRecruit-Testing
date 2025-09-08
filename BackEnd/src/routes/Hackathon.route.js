import express from "express";
import { 
    // createHackathon, 
    getHackathons,
    getHackathon
} from "../controllers/hackathon.controller.js";

const router=express.Router();

// api '.../hackathon'
router.get('/',getHackathons);
router.get('/:id',getHackathon);
// router.post('/',createHackathon);

export default router;