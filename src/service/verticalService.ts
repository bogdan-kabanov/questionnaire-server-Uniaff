import QuestionVertical from "../models/questionVerticalModel";

interface QuestionVerticalData {
  id: number;
  vertical_name: string;
}

class VerticalService {
  private async getVerticalData(
    geo: QuestionVertical
  ): Promise<QuestionVerticalData> {
    return {
      id: geo.id,
      vertical_name: geo.vertical_name,
    };
  }

  async createVertical(vertical_name: string) {
    return QuestionVertical.create({
      vertical_name,
    });
  }

  async updateVertical(verticalId: number, vertical_name: string) {
    const vertical = await QuestionVertical.findByPk(verticalId);

    if (!vertical) {
      throw new Error("Вертикаль не найдена");
    }

    vertical.vertical_name = vertical_name;
    return vertical.save();
  }

  async deleteVertical(verticalId: number) {
    const vertical = await QuestionVertical.findByPk(verticalId);

    if (!vertical) {
      throw new Error("Вертикаль не найдена");
    }

    return vertical.destroy();
  }

  async duplicateVertical(verticalId: number) {
    const vertical = await QuestionVertical.findByPk(verticalId);

    if (!vertical) {
      throw new Error("Вертикаль не найдена");
    }

    return QuestionVertical.create({
      vertical: vertical.vertical_name,
    });
  }

  async getVertical(questionId: number) {
    try {
      const vertical = await QuestionVertical.findAll({
        where: {
          question_id: questionId,
        },
      });
      const verticalData = vertical.map((vertical) => {
        return {
          id: vertical.id,
          namevertical_name: vertical.vertical_name,
        };
      });

      return verticalData;
    } catch (error) {
      console.error("Ошибка при получении вертикали:", error);
    }
  }

  async getVerticalAll(): Promise<QuestionVerticalData[]> {
    try {
      const vertical_list = await QuestionVertical.findAll();
      return Promise.all(vertical_list.map((vertical) => this.getVerticalData(vertical)));
    } catch (error) {
      console.error("Ошибка при получение вертикалей:", error);
      throw error;
    }
  }
}

export default new VerticalService();
