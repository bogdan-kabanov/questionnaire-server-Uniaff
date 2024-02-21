import express from "express";
import QuestionController from "../controllers/questionController";

const router = express.Router();

router.post("/create", QuestionController.createQuestion);
router.put("/edit/:id", QuestionController.updateQuestion);
router.delete("/remove/:id", QuestionController.deleteQuestion);
router.post("/clone/:id", QuestionController.copyQuestion);
router.get("/get/:id", QuestionController.getQuestion);
router.get("/get-all/", QuestionController.getQuestionAll);
router.get("/get-multiple", QuestionController.getMultipleQuestions);
router.get("/by-geo/:geo_id", QuestionController.getQuestionsByGeo);
router.get("/by-vertical/:vertical_id", QuestionController.getQuestionsByVertical);
router.get("/by-filter", QuestionController.getQuestionsByFilters);
router.get("/search/:name", QuestionController.getQuestionByName)

export default router;