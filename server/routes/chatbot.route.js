import express from "express";
import { chatWithBot } from "../controllers/chatbot.controller.js";
import { testGemini } from "../controllers/test.controller.js";

const router = express.Router();

router.post("/chat", chatWithBot);
router.get("/test", testGemini);

export default router;
