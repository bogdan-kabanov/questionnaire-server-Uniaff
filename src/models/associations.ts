import ResponseData from "./responseDataModel";
import Question from "./questionModel";
import Answer from "./answerModel";
import HandwrittenAnswer from "./handwrittenAnswerModel";

ResponseData.belongsTo(Question, {
  foreignKey: "question_id",
  as: "question",
});

ResponseData.belongsTo(Answer, {
  foreignKey: "answer_id",
  as: "answer",
});

Question.hasMany(Answer, {
  foreignKey: "question_id",
  as: "answers",
});

HandwrittenAnswer.belongsTo(Question, {
  foreignKey: "question_id",
  as: "question",
});

Question.hasMany(HandwrittenAnswer, {
  foreignKey: "question_id",
  as: "handwrittenAnswers", // Название ассоциации
});

Answer.hasMany(ResponseData, {
  foreignKey: "answer_id",
  as: "responseData",
});


export { ResponseData, Question, Answer };
