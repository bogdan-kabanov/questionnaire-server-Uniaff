import Question from "../models/questionModel";
import { Includeable, Op, Sequelize } from "sequelize";
import "../models/associations";
import QuestionGeo from "../models/questionGeoModel";
import QuestionVertical from "../models/questionVerticalModel";
import ApiError from "../exceptions/apiError";

interface QuestionData {
  id: number;
  name: string;
  geo: string | number;
  vertical: string | number;
  createdAt?: Date;
}

interface Filters {
  geo?: string;
  vertical?: string;
  startTime?: string;
  endTime?: string;
}

class QuestionService {
  private async getQuestionData(question: Question): Promise<QuestionData> {
    const questionData: QuestionData = {
      id: question.id,
      name: question.name,
      geo: question.geo,
      vertical: question.vertical,
    };

    const questionWithLocation = (await Question.findOne({
      where: { geo: question.geo },
      include: [{ model: QuestionGeo, as: "geoData" }] as Includeable[],
    })) as Question & { geoData: { location_name: string } };

    const questionWithVertical = (await Question.findOne({
      where: { vertical: question.vertical },
      include: [{ model: QuestionVertical, as: "verticalData" }],
    })) as Question & { verticalData: { vertical_name: string } };

    if (questionWithLocation.geoData) {
      questionData.geo = questionWithLocation.geoData.location_name;
    }

    if (questionWithLocation.geoData) {
      questionData.vertical = questionWithVertical.verticalData.vertical_name;
    }

    return questionData;
  }

  async createQuestion(name: string, geo: number, vertical: number) {
    try {
      const question = await Question.create({
        name: name,
        geo: geo,
        vertical: vertical,
      });

      return question;
    } catch (error) {
      console.error("Ошибка при создании вопроса:", error);
      throw new Error("Ошибка при создании вопроса");
    }
  }

  async updateQuestion(id: number, name: string) {
    try {
      const [updatedRows] = await Question.update({ name }, { where: { id } });
      if (updatedRows === 0) {
        throw new Error("Вопрос не найден");
      }
      return "Вопрос успешно обновлен";
    } catch (error) {
      console.error("Ошибка при обновлении вопроса:", error);
      throw new Error("Ошибка при обновлении вопроса");
    }
  }

  async deleteQuestion(id: number) {
    try {
      const deletedRowCount = await Question.destroy({ where: { id } });
      if (deletedRowCount === 0) {
        throw new Error("Вопрос не найден");
      }
      return "Вопрос успешно удален";
    } catch (error) {
      console.error("Ошибка при удалении вопроса:", error);
      throw new Error("Ошибка при удалении вопроса");
    }
  }

  async copyQuestion(id: number) {
    try {
      const originalQuestion = await Question.findByPk(id);
      if (!originalQuestion) {
        throw new Error("Исходный вопрос не найден");
      }
      const clonedQuestion = await Question.create({
        name: originalQuestion.name,
      });
      return clonedQuestion;
    } catch (error) {
      console.error("Ошибка при копировании вопроса:", error);
      throw new Error("Ошибка при копировании вопроса");
    }
  }

  async getQuestion(id: number) {
    const question = await Question.findByPk(id);

    return question ? this.getQuestionData(question) : null;
  }

  async getQuestionAll() {
    try {
      const questions = await Question.findAll();
      const questionData = await Promise.all(
        questions.map((question) => this.getQuestionData(question))
      );
      return questionData;
    } catch (error) {
      console.error("Ошибка при получении вопросов:", error);
    }
  }

  async getMultipleQuestions(questionIds: number[]) {
    try {
      const questions = await Question.findAll({
        where: {
          id: {
            [Op.in]: questionIds,
          },
        },
      });
  
      const questionData = await Promise.all(
        questions.map((question) => this.getQuestionData(question))
      );
  
      return questionData;
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
    }
  }

  async getQuestionsByGeo(geo: number | string) {
    try {
      const questions = await Question.findAll({
        include: [
          {
            model: QuestionGeo,
            as: "geoData",
            where: { location_name: geo },
          },
        ],
      });

      if (questions.length === 0) {
        throw ApiError.NotFound("По вашему запросу вопросы не найдены", [
          { location_name: geo },
        ]);
      }

      const questionData = await Promise.all(
        questions.map((question) => this.getQuestionData(question))
      );
      return questionData;
    } catch (error) {
      console.error("Ошибка при получении вопросов по гео:", error);
      throw error;
    }
  }

  async getQuestionsByVertical(vertical: number | string) {
    try {
      const questions = await Question.findAll({
        include: [
          {
            model: QuestionVertical,
            as: "verticalData",
            where: { vertical_name: vertical },
          },
        ],
      });

      if (questions.length === 0) {
        throw ApiError.NotFound("По вашему запросу вопросы не найдены", [
          { vertical_name: vertical },
        ]);
      }

      const questionData = await Promise.all(
        questions.map((question) => this.getQuestionData(question))
      );
      return questionData;
    } catch (error) {
      console.error("Ошибка при получении вопросов по гео:", error);
    }
  }

  async getQuestionsByFilters(filters: Filters): Promise<QuestionData[]> {

    const queryConditions = this.createQueryConditions(filters);

    try {
      const questions = await Question.findAll(queryConditions);

      if (questions && questions.length > 0) {
        const questionData = questions.map((question) =>
          this.formatQuestionData(question)
        );
        return questionData;
      } else {
        throw new Error("Вопросы по заданным критериям не найдены.");
      }
    } catch (error) {
      console.error("Ошибка при получении вопросов:", error);
      throw error;
    }
  }

  private createQueryConditions(filters: Filters) {
    const conditions: any = {
      where: {},
      include: [],
    };

    if (filters.geo) {
      conditions.include.push({
        model: QuestionGeo,
        as: "geoData",
        where: { location_name: filters.geo },
      });
    }

    if (filters.vertical) {
      conditions.include.push({
        model: QuestionVertical,
        as: "verticalData",
        where: { vertical_name: filters.vertical },
      });
    }


    if (filters.startTime || filters.endTime) {
      conditions.where.createdAt = {};
      if (filters.startTime)
        conditions.where.createdAt[Op.gte] = new Date(filters.startTime);
      if (filters.endTime)
        conditions.where.createdAt[Op.lte] = new Date(filters.endTime);
    }

    return conditions;
  }

  async searchQuestions(query: string): Promise<QuestionData[]> {
    try {
      const questions = await Question.findAll({
        where: {
          name: {
            [Op.iLike]: `%${query}%`
          }
        }
      });
  
      return questions.map(question => this.formatQuestionData(question));
    } catch (error) {
      console.error("Ошибка при поиске вопросов:", error);
      throw error;
    }
  }
  

  private formatQuestionData(question: any): QuestionData {
    return {
      id: question.id,
      name: question.name,
      geo: question.geoData ? question.geoData.location_name : undefined,
      vertical: question.verticalData ? question.verticalData.vertical_name : undefined,
      createdAt: question.createdAt
    };
  }


}

export default new QuestionService();
