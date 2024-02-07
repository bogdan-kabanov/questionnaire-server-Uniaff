import Question from "../models/questionModel";
import { Op } from 'sequelize';

class QuestionService {
  async createQuestion(name: string) {
    try {
      console.log(name);

      const question = await Question.create({ name });

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

    return question?.dataValues;
  }

  async getQuestionAll() {
    try {
      const questions = await Question.findAll();
      const questionData = questions.map((question) => {
        return {
          id: question.id,
          name: question.name,
        };
      });

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
            [Op.in]: questionIds, // Используйте оператор Op.in для поиска по нескольким ID
          },
        },
      });

      return questions;
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
    }
  }
}

export default new QuestionService();
