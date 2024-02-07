import dotenv from "dotenv";
import express from "express";
import router from "./router/router";
import sequelize from "./database/connect";
import cookieParser from 'cookie-parser';
import cors from 'cors'

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: "*",
  }),
)

app.use("/api", router);

sequelize
  .authenticate()
  .then(() => {
    console.log("Соединение с базой данных успешно установлено");
  })
  .then(() => {

    return sequelize.sync();
  })
  .then(() => {
    console.log("Таблицы успешно синхронизированы");

    app.listen(port, () => {
      console.log(`Сервер запущен на порту ${port}`);
    });
  })
  .catch((error: Error) => {
    console.error("Ошибка в подключении к базе данных:", error);
  });
