import Question from "../models/questionModel";
import { Includeable, Op } from "sequelize";
import "../models/associations"
import QuestionGeo from "../models/questionGeoModel";
import QuestionVertical from "../models/questionVerticalModel";

interface QuestionData {
  id: number;
  name: string;
  geo: string | number;
  vertical: string | number;
}

class QuestionService {
  private async getQuestionData(question: Question): Promise<QuestionData> {

    const questionData: QuestionData = {
      id: question.id,
      name: question.name,
      geo: question.geo,
      vertical: question.vertical,
    };

    const questionWithLocation = await Question.findOne({
      where: { geo: question.geo }, // Фильтруем вопросы по id гео
      include: [{ model: QuestionGeo, as: 'geoData' }] as Includeable[], // Включаем связанную модель QuestionGeo
    }) as Question & { geoData: { location_name: string } };

    const questionWithVertical = await Question.findOne({
      where: { vertical: question.vertical }, // Фильтруем вопросы по значению атрибута vertical текущего вопроса
      include: [{ model: QuestionVertical, as: 'verticalData' }] // Включаем связанную модель QuestionVertical
    }) as Question & { verticalData: { vertical_name: string } };
  
    if (questionWithLocation.geoData) {
      questionData.geo =questionWithLocation.geoData.location_name; 
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
        questions.map(question => this.getQuestionData(question))
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

      return questions.map((question) => this.getQuestionData(question));
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
    }
  }

  async getQuestionsByGeo(geo: number | string) {
    try {
      const questions = await Question.findAll({
        include: [{
          model: QuestionGeo,
          as: 'geoData',
          where: { location_name: geo } // Фильтр по полю location_name в связанной модели
        }]
      });
  
      const questionData = await Promise.all(
        questions.map(question => this.getQuestionData(question))
      );
      return questionData;
    } catch (error) {
      console.error("Ошибка при получении вопросов по гео:", error);
    }
  }
}

export default new QuestionService();
