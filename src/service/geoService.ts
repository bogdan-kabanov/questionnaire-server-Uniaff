import QuestionGeo from "../models/questionGeoModel";

interface QuestionGeoData {
  id: number;
  location_name: string;
}

class GeoService {
  private async getGeoData(geo: QuestionGeo): Promise<QuestionGeoData> {
    return {
      id: geo.id,
      location_name: geo.location_name,
    };
  }

  async createGeo(location_name: string) {
    return QuestionGeo.create({
        location_name
    });
  }

  async updateGeo(geoId: number, location_name: string) {
    const geo = await QuestionGeo.findByPk(geoId);

    if (!geo) {
      throw new Error('Гео-локация не найденна');
    }

    geo.location_name = location_name;
    return geo.save();
  }

  async deleteGeo(geoId: number) {
    const geo = await QuestionGeo.findByPk(geoId);

    if (!geo) {
      throw new Error('Гео-локация не найденна');
    }

    return geo.destroy();
  }

  async duplicateGeo(geoId: number) {
    const geo = await QuestionGeo.findByPk(geoId);

    if (!geo) {
      throw new Error('Гео-локация не найденна');
    }

    return QuestionGeo.create({
      location_name: geo.location_name,
    });
  }

  async getGeo(questionId: number): Promise<QuestionGeoData[]> {
    try {
      const geo = await QuestionGeo.findAll({
        where: {
          question_id: questionId,
        }
      });
      return geo.map((geo) => ({
        id: geo.id,
        location_name: geo.location_name,
      }));
    } catch (error) {
      console.error("Ошибка получения гео-локации:", error);
      throw error;
    }
  }

  async getGeoAll(): Promise<QuestionGeoData[]> {
    try {
      const geo_list = await QuestionGeo.findAll();
      return Promise.all(geo_list.map((geo) => this.getGeoData(geo)));
    } catch (error) {
      console.error("Ошибка получения гео-локации:", error);
      throw error;
    }
  }
}

export default new GeoService();