import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/connect';

class ResponseData extends Model {
  public id!: number;
  public question_id!: number;
  public answer_id!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

ResponseData.init(
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
    answer_id: {
      type: DataTypes.INTEGER,
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
    modelName: 'ResponseData',
    tableName: 'response_data',
  }
);



export default ResponseData;