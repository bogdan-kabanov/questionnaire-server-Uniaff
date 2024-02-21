import express from "express";
import AnswerController from "../controllers/answerController";
import handwrittenAnswerController from "../controllers/handwrittenAnswerController";
import questionRouter from "./questionRouter";
import geoRouter from "./geoRouter";
import verticalRouter from "./verticalRouter";
const router = express.Router();

// questions
router.use('/question', questionRouter)

// geo
router.use("/geo",geoRouter);

// vertical
router.use("/vertical", verticalRouter);

// answers
router.post("/answers/create", AnswerController.createAnswer);
router.put("/answers/:answerId", AnswerController.updateAnswer);
router.delete("/answers/:answerId", AnswerController.deleteAnswer);
router.post("/answers/:answerId/duplicate", AnswerController.duplicateAnswer);
router.get("/answers/get/:id", AnswerController.getAnswers);

// handwritten answers
router.post("/handwrittenAnswer/create", handwrittenAnswerController.createAnswer);
router.get("/handwrittenAnswer/:questionId", handwrittenAnswerController.getAllAnswersForQuestion);

export default router;
