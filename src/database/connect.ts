import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  dialect: 'mysql',
  define: {
    underscored: true,
  },
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Соединение с базой данных успешно установлено");
   
    await sequelize.sync();
    console.log("Таблицы успешно синхронизированы");
  } catch (error) {
    console.error("Ошибка подключения к базе данных:", error);
    throw error;
  }
})();

export default sequelize;
