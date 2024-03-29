import * as ExcelJS from 'exceljs';
import HandwrittenAnswer from '../models/handwrittenAnswerModel';
import Question from '../models/questionModel';

class ExcelService {
  async generateExcelFile() {
    try {
      const answers = await HandwrittenAnswer.findAll();

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Ответы');

      worksheet.addRow(['ID', 'Question', 'Response Text', 'Created At']);
      const questions = await Question.findAll();

      const questionMap: { [key: number]: string } = {};
      questions.forEach(question => {
        questionMap[question.id] = question.name;
      });

      answers.forEach(answer => {
        worksheet.addRow([answer.id, questionMap[answer.question_id], answer.response_text, answer.createdAt]);
      });

      const filePath = 'answers.xlsx';
      await workbook.xlsx.writeFile(filePath);

      console.log('Файл Excel успешно создан:', filePath);
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  }
}

export default new ExcelService();
