import Answer from '../models/answerModel';

class AnswerService {
  async createAnswer(questionId: number, name: string) {
    return Answer.create({
      question_id: questionId,
      name: name,
    });
  }

  async updateAnswer(answerId: number, name: string) {
    const answer = await Answer.findByPk(answerId);

    if (!answer) {
      throw new Error('Ответ не найден');
    }

    answer.name = name;
    return answer.save();
  }

  async deleteAnswer(answerId: number) {
    const answer = await Answer.findByPk(answerId);

    if (!answer) {
      throw new Error('Ответ не найден');
    }

    return answer.destroy();
  }

  async duplicateAnswer(answerId: number) {
    const answer = await Answer.findByPk(answerId);

    if (!answer) {
      throw new Error('Ответ не найден');
    }

    return Answer.create({
      question_id: answer.question_id,
      name: answer.name,
    });
  }

  async getAnswers(questionId: number) {
    try {
      const answers = await Answer.findAll({
        where: {
          question_id: questionId,
        }
      });
      const answersData = answers.map((answer) => {
        return {
          id: answer.id,
          name: answer.name,
        };
      });
  
      return answersData;
    } catch (error) {
      console.error("Ошибка при получении вопросов:", error);
    }
  }
}

export default new AnswerService();
