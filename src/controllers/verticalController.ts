import { Request, Response } from "express";
import VerticalService from "../service/verticalService";
import NodeCache from 'node-cache'; // Убедитесь, что библиотека node-cache установлена
const cache = new NodeCache({ stdTTL: 60 }); // Устанавливаем время жизни кэша в секундах (например, 60 секунд)

class VerticalController {
  async createVertical(req: Request, res: Response) {
    try {
      const { vertical_name } = req.body;

      const result = await VerticalService.createVertical(vertical_name);
      return res.status(201).json(result);
    } catch (error) {
      console.error("Ошибка при создании вопроса:", error);
      return res.status(500).json({ error: "Ошибка при создании вопроса" });
    }
  }

  async updateVertical(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const result = await VerticalService.updateVertical(Number(id), name);
      return res.status(200).json({ result });
    } catch (error) {
      console.error("Ошибка при обновлении вопроса:", error);
      return res.status(500).json({ error: "Ошибка при обновлении вопроса" });
    }
  }

  async deleteVertical(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await VerticalService.deleteVertical(Number(id));
      return res.status(200).json({ result });
    } catch (error) {
      console.error("Ошибка при удалении вопроса:", error);
      return res.status(500).json({ error: "Ошибка при удалении вопроса" });
    }
  }

  async getVertical(req: Request, res: Response) {
    const { id } = req.params;
    const result = await VerticalService.getVertical(Number(id));
    return res.status(200).json({ result });
  }

  async getVerticalAll(req: Request, res: Response) {
    const vertical_list = await VerticalService.getVerticalAll();
    return res.status(200).json({ vertical_list });
  }


}

export default new VerticalController();
