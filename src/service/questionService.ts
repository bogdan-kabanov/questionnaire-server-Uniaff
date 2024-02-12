import Question from "../models/questionModel";
import { Op } from 'sequelize';

interface QuestionData {
  id: number;
  name: string;
  geo: number;
  vertical: number;
}

class QuestionService {
  private questionFields: Array<keyof QuestionData> = ['id', 'name', 'geo', 'vertical'];

  private getQuestionData(question: Question): QuestionData {
    const questionData: QuestionData = {} as QuestionData;

    this.questionFields.forEach(field => {
      const value = question.get(field);
      questionData[field]
    });

    return questionData;
  }


  async createQuestion(name: string, geo: number, vertical: number) {
    try {
      const question = await Question.create({ name: name, geo: geo, vertical: vertical });

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
      const questionData = questions.map(question => this.getQuestionData(question));

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

      return questions.map(question => this.getQuestionData(question));
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
    }
  }
}

export default new QuestionService();
