import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/connect';

class QuestionVertical extends Model {
  public id!: number;
  public vertical_name!: string;
}

QuestionVertical.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    vertical_name: {
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
    modelName: 'QuestionVertical',
    tableName: 'question_verticals',
  }
);


export default QuestionVertical;
