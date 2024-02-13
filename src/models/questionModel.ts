import { DataTypes, Model, BelongsTo } from 'sequelize';
import sequelize from '../database/connect';
import QuestionGeo from './questionGeoModel';
import QuestionVertical from './questionVerticalModel';

class Question extends Model {
  public id!: number;
  public name!: string;
  public geo!: number;
  public vertical!: number;

  // Определяем ассоциацию с моделью QuestionGeo
  public readonly geoData?: QuestionGeo;

  public static associations: {
    geoData: BelongsTo<Question, QuestionGeo>;
  };
}

Question.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    geo: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    vertical: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Question',
    tableName: 'questionnaire_questions',
  }
);

Question.belongsTo(QuestionGeo, {
  foreignKey: "geo",
  targetKey: "id",
  as: "geoData",
});

Question.belongsTo(QuestionVertical, {
  foreignKey: "vertical",
  targetKey: "id",
  as: "verticalData",
});


export default Question;
