import { Request, Response } from "express";
import GeoService from "../service/geoService";
import NodeCache from 'node-cache';
const cache = new NodeCache({ stdTTL: 60 });

class GeoController {
  async createGeo(req: Request, res: Response) {
    try {
      const { location_name } = req.body;

      const result = await GeoService.createGeo(location_name);
      return res.status(201).json(result);
    } catch (error) {
      console.error("Ошибка при создании вопроса:", error);
      return res.status(500).json({ error: "Ошибка при создании вопроса" });
    }
  }

  async updateGeo(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const result = await GeoService.updateGeo(Number(id), name);
      return res.status(200).json({ result });
    } catch (error) {
      console.error("Ошибка при обновлении вопроса:", error);
      return res.status(500).json({ error: "Ошибка при обновлении вопроса" });
    }
  }

  async deleteGeo(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await GeoService.deleteGeo(Number(id));
      return res.status(200).json({ result });
    } catch (error) {
      console.error("Ошибка при удалении вопроса:", error);
      return res.status(500).json({ error: "Ошибка при удалении вопроса" });
    }
  }

  async getGeo(req: Request, res: Response) {
    const { id } = req.params;
    const result = await GeoService.getGeo(Number(id));
    return res.status(200).json({ result });
  }

  async getGeoAll(req: Request, res: Response) {
    const geo_list = await GeoService.getGeoAll();
    return res.status(200).json({ geo_list });
  }

}

export default new GeoController();
