import { Request, Response } from "express";
import AnswerService from "../service/answerService";

class AnswerController {
  async createAnswer(req: Request, res: Response) {
    try {
      const { question_id, name } = req.body;
      const answer = await AnswerService.createAnswer(question_id, name);
      res.status(201).json(answer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ошибка при создании ответа" });
    }
  }

  async updateAnswer(req: Request, res: Response) {
    try {
      const answerId = parseInt(req.params.answerId, 10);
      const { name } = req.body;
      const answer = await AnswerService.updateAnswer(answerId, name);
      res.json(answer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ошибка при редактировании ответа" });
    }
  }

  async deleteAnswer(req: Request, res: Response) {
    try {
      const answerId = parseInt(req.params.answerId, 10);
      await AnswerService.deleteAnswer(answerId);
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ошибка при удалении ответа" });
    }
  }

  async duplicateAnswer(req: Request, res: Response) {
    try {
      const answerId = parseInt(req.params.answerId, 10);
      const duplicatedAnswer = await AnswerService.duplicateAnswer(answerId);
      res.status(201).json(duplicatedAnswer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ошибка при копировании ответа" });
    }
  }

  async getAnswers(req: Request, res: Response) {
    const { id } = req.params;
    const answers = await AnswerService.getAnswers(Number(id));
    return res.status(200).json({ answers });
  }
}

export default new AnswerController();
