import express from "express";
import QuestionController from "../controllers/questionController";
import AnswerController from "../controllers/answerController";
import handwrittenAnswerController from "../controllers/handwrittenAnswerController";
import { ResponseData, Question, Answer } from '../models/associations';
import HandwrittenAnswer from "../models/handwrittenAnswerModel";

const router = express.Router();

// questions
router.post("/question/create", QuestionController.createQuestion);
router.put("/question/edit/:id", QuestionController.updateQuestion);
router.delete("/question/remove/:id", QuestionController.deleteQuestion);
router.post("/question/clone/:id", QuestionController.copyQuestion);
router.get("/question/get/:id", QuestionController.getQuestion);
router.get("/question/get-all/", QuestionController.getQuestionAll);
router.get("/question/get-multiple", QuestionController.getMultipleQuestions);

// https://analcustdev.com/api/question/get-multiple

// answers
router.post("/answers/create", AnswerController.createAnswer);
router.put("/answers/:answerId", AnswerController.updateAnswer);
router.delete("/answers/:answerId", AnswerController.deleteAnswer);
router.post("/answers/:answerId/duplicate", AnswerController.duplicateAnswer);
router.get("/answers/get/:id", AnswerController.getAnswers);

// handwritten answers
router.post("/handwrittenAnswer/create", handwrittenAnswerController.createAnswer);
router.get("/handwrittenAnswer/:questionId", handwrittenAnswerController.getAllAnswersForQuestion);

// https://analcustdev.com/api/handwrittenAnswer/:questionId

router.get('/questions', async (req, res) => {
    try {
      const questions = await Question.findAll({
        include: [
          {
            model: Answer,
            as: 'answers', // Имя связи, как определено в файле associations.ts
            include: [
              {
                model: ResponseData,
                as: 'responseData', // Имя связи, как определено в файле associations.ts
              },
            ],
          },
        ],
      });
      res.json(questions);
    } catch (error) {
      console.error(error);
      res.status(500).send('Ошибка при получении данных');
    }
  });

  
// Маршрут для получения всех вопросов и связанных с ними HandwrittenAnswer
router.get('/questions-with-handwritten-answers', async (req, res) => {
    try {
      const questionsWithHandwrittenAnswers = await Question.findAll({
        include: [
          {
            model: HandwrittenAnswer,
            as: 'handwrittenAnswers', // Название ассоциации
          },
        ],
      });
  
      res.json(questionsWithHandwrittenAnswers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Произошла ошибка при получении данных.' });
    }
  });

  
export default router;
