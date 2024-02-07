import { Request, Response } from "express";
import HandwrittenAnswerService from "../service/handwrittenAnswerService";

class HandwrittenAnswerController {
  async createAnswer(req: Request, res: Response) {
    try {
      const { question_id, response_text } = req.body;
      const answer = await HandwrittenAnswerService.createAnswer(
        question_id,
        response_text
      );
      res.status(201).json(answer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ошибка при создании ответа" });
    }
  }

  async getAllAnswersForQuestion(req: Request, res: Response) {
    try {
      const  questionId = req.params.questionId;
      const answerList =
        await HandwrittenAnswerService.getAllAnswersForQuestion(Number(questionId));

      res.status(201).json(answerList);
    } catch (error) {
      console.error(error);
    }
  }
}

export default new HandwrittenAnswerController();
