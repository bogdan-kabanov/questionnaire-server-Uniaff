import * as ExcelJS from 'exceljs';
import HandwrittenAnswer from '../models/handwrittenAnswerModel';
import Question from '../models/questionModel';

class ExcelService {
  async generateExcelFile() {
    try {
      // Получаем все записи из таблицы MySQL
      const answers = await HandwrittenAnswer.findAll();

      // Создаем новую рабочую книгу
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Ответы');

      // Создаем заголовки столбцов в Excel
      worksheet.addRow(['ID', 'Question', 'Response Text', 'Created At']); // Заменяем 'Question ID' на 'Question'

      // Получаем все записи из таблицы MySQL для модели "question"
      const questions = await Question.findAll();

      // Создаем объект, который будет содержать ID вопроса в качестве ключа и текст вопроса в качестве значения
      const questionMap: { [key: number]: string } = {};
      questions.forEach(question => {
        questionMap[question.id] = question.name;
      });

      // Добавляем данные из MySQL в Excel с учетом соответствия вопросов
      answers.forEach(answer => {
        worksheet.addRow([answer.id, questionMap[answer.question_id], answer.response_text, answer.createdAt]);
      });

      // Сохраняем файл Excel
      const filePath = 'answers.xlsx';
      await workbook.xlsx.writeFile(filePath);

      console.log('Файл Excel успешно создан:', filePath);
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  }
}

export default new ExcelService();
