import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/connect';

class HandwrittenAnswer extends Model {
  public id!: number;
  public question_id!: number;
  public response_text!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

HandwrittenAnswer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    response_text: {
      type: DataTypes.TEXT,
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
    modelName: 'HandwrittenAnswer',
    tableName: 'handwritten_answers',
  }
);

export default HandwrittenAnswer;
