import { NextFunction, Request, Response } from "express";
import QuestionService from "../service/questionService";
import NodeCache from "node-cache";
const cache = new NodeCache({ stdTTL: 60 });

class QuestionController {
  async createQuestion(req: Request, res: Response) {
    try {
      const { name, geo, vertical } = req.body;

      const question = await QuestionService.createQuestion(
        name,
        geo,
        vertical
      );
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
      const cacheKey = JSON.stringify(ids);
      const cachedData: any = cache.get(cacheKey);

      if (cachedData) {
        console.log("Данные найдены в кэше.");
        return res.status(200).json({ questionList: cachedData });
      }

      const questionList = await QuestionService.getMultipleQuestions(ids);

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

  async getQuestionsByGeo(req: Request, res: Response, next: NextFunction) {
    try {
      const geo_id = req.params.geo_id;

      const questionsByGeo = await QuestionService.getQuestionsByGeo(geo_id);
      return res.status(200).json({ questionsByGeo });
    } catch (error) {
      next(error);
    }
  }

  async getQuestionsByVertical(req: Request, res: Response) {
    const vertical_id = req.params.vertical_id;

    const questionsByVertical = await QuestionService.getQuestionsByVertical(
      vertical_id
    );
    return res.status(200).json({ questionsByVertical });
  }

  async getQuestionsByFilters(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { geo, vertical, startTime, endTime } = req.query;

      const questions = await QuestionService.getQuestionsByFilters({
        geo: geo as string | undefined,
        vertical: vertical as string | undefined,
        startTime: startTime as string | undefined,
        endTime: endTime as string | undefined,
      });

      res.json(questions);
    } catch (error) {
      next(error);
    }
  }

  async getQuestionByName(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const name = req.params.name;
      const questions = await QuestionService.searchQuestions(name);
      res.json(questions);
    } catch (error) {
      next(error);
    }
  }
}

export default new QuestionController();
