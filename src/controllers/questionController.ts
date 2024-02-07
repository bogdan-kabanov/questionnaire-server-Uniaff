import { Request, Response } from "express";
import QuestionService from "../service/questionService";
import NodeCache from 'node-cache'; // Убедитесь, что библиотека node-cache установлена
const cache = new NodeCache({ stdTTL: 60 }); // Устанавливаем время жизни кэша в секундах (например, 60 секунд)

class QuestionController {
  async createQuestion(req: Request, res: Response) {
    try {
      const { name } = req.body;

      const question = await QuestionService.createQuestion(name);
      return res.status(201).json(question);
    } catch (error) {
      console.error("Ошибка при создании вопроса:", error);
      return res.status(500).json({ error: "Ошибка при создании вопроса" });
    }
  }

  async updateQuestion(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const message = await QuestionService.updateQuestion(Number(id), name);
      return res.status(200).json({ message });
    } catch (error) {
      console.error("Ошибка при обновлении вопроса:", error);
      return res.status(500).json({ error: "Ошибка при обновлении вопроса" });
    }
  }

  async deleteQuestion(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const message = await QuestionService.deleteQuestion(Number(id));
      return res.status(200).json({ message });
    } catch (error) {
      console.error("Ошибка при удалении вопроса:", error);
      return res.status(500).json({ error: "Ошибка при удалении вопроса" });
    }
  }

  async copyQuestion(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const clonedQuestion = await QuestionService.copyQuestion(Number(id));
      return res.status(201).json(clonedQuestion);
    } catch (error) {
      console.error("Ошибка при копировании вопроса:", error);
      return res.status(500).json({ error: "Ошибка при копировании вопроса" });
    }
  }

  async getQuestion(req: Request, res: Response) {
    const { id } = req.params;
    const question = await QuestionService.getQuestion(Number(id));
    return res.status(200).json({ question });
  }

  async getMultipleQuestions(req: Request, res: Response) {
    const { ids } = req.body as { ids: number[] };

    try {
      // Проверяем, есть ли кэшированный результат для данного запроса
      const cacheKey = JSON.stringify(ids);
      const cachedData: any = cache.get(cacheKey);

      if (cachedData) {
        console.log("Данные найдены в кэше.");
        return res.status(200).json({ questionList: cachedData });
      }

      // Если данных нет в кэше, загружаем их из базы данных
      const questionList = await QuestionService.getMultipleQuestions(ids);

      // Кэшируем результат на заданное время
      cache.set(cacheKey, questionList);

      return res.status(200).json({ questionList });
    } catch (error) {
      console.error("Ошибка при загрузке вопросов:", error);
      return res.status(500).json({ error: "Ошибка при загрузке вопросов" });
    }
  }
  
  async getQuestionAll(req: Request, res: Response) {
    const questions = await QuestionService.getQuestionAll();
    return res.status(200).json({ questions });
  }
}

export default new QuestionController();
