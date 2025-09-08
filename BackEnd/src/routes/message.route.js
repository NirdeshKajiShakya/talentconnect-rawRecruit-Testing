import express from "express";

import secureRoute from "../middlewares/secureRoute.js"
import { getMessage, sendMessage } from "../controllers/message.controller.js";
// import { getMessages, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/get/:id", secureRoute , getMessage);
router.post("/send/:id", secureRoute, sendMessage);

export default router;