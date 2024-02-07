import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/connect';
import Question from './questionModel';

class Answer extends Model {
  public id!: number;
  public question_id!: number;
  public name!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Answer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Question,
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
    modelName: 'Answer',
    tableName: 'answer_options',
  }
);


export default Answer;
