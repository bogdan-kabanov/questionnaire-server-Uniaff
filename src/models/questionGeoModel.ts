import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/connect';

class QuestionGeo extends Model {
  public id!: number;
  public location_name!: string;
  public geo!: number;
}

QuestionGeo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    location_name: {
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
    modelName: 'QuestionGeo',
    tableName: 'question_geo',
  }
);

export default QuestionGeo;
