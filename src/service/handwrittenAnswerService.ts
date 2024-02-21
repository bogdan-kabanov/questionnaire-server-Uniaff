import HandwrittenAnswer from "../models/handwrittenAnswerModel";
import Question from "../models/questionModel";
import excelService from "./excelService";

class HandwrittenAnswerService {
  async createAnswer(questionId: number, response_text: string) {
    try {
      const result = await HandwrittenAnswer.create({
        question_id: questionId,
        response_text: response_text,
      });

      if (result) {
        await excelService.generateExcelFile();
      }

      return result;
    } catch (error) {
      console.error("Произошла ошибка при создании записи:", error);
      throw error;
    }
  }

  async getAllAnswersForQuestion(questionId: number) {
    try {
      const questionWithHandwrittenAnswer = await Question.findOne({
        where: { id: questionId },
        include: [
          {
            model: HandwrittenAnswer,
            as: "handwrittenAnswers",
          },
        ],
      });

      return questionWithHandwrittenAnswer;
    } catch (error) {
      console.error(error);
    }
  }
}

export default new HandwrittenAnswerService();
