const { Router } = require("express");
const File = require("../models/File");
const router = Router();
const fs = require("fs");
const auth = require("../middleware/auth.middleware");

var baseUrl = process.env.BASE_URL_PRODUCTION;
if (process.env.NODE_ENV === "development") {
  baseUrl = process.env.BASE_URL_LOCAL;
}

uploadFile = async (req, res) => {
  // определяем  разрешенные типы файла
  const allowedTypes = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
  // определяем максимальный размер файла  в байтах (5 мб)
  const sizeLimit = 5000000;

  try {
    //если файла в запросе нет
    if (!req.files.image) {
      //возвращаем ответ с неудачей
      return res.json({ success: false, message: "нет файла" });
    }

    // извлекаем необходимые параметры из тела запроса
    const file = req.files.image;
    const userId = req.body.userId;
    const text = req.body.text;

    // подготавливаем имя файла и путь сохранения
    const fileName = file.name.replace(/ /g, "-");
    const path = "client/build/images/" + fileName;

    //создаем ссылку на файл, которую будем выдавать по /api/lastfile
    const link = baseUrl + ":" + process.env.PORT + "/images/" + fileName;

    //если файл не подходит под допустимые форматы
    if (!allowedTypes.includes(file.mimetype)) {
      //возвращаем ответ с неудачей
      return res.json({ success: false, message: "Недопустимый формат файла" });
    }
    //если файл превосходит допустимый размер
    if (file.size > sizeLimit) {
      //возвращаем ответ с неудачей
      return res.json({ success: false, message: "Недопустимый размер файла" });
    }

    //сохраняем файл
    file.mv(path);

    // записываем текст, ссылку и юзер id в базу
    const fileDb = new File({
      text,
      link,
      userId,
    });
    await fileDb.save();

    // собираем данные о добавленном файле чтобы вернуть их в успешном ответе
    const fileInfo = {
      name: fileName,
      size: file.size,
      type: file.mimetype,
      link: link,
      text: text,
      userId: userId,
    };

    //возвращаем ответ с успешным статусомы и данными о добавленном файле
    return res.status(201).json({ success: true, fileInfo });
  } catch (error) {
    //в случае ошибки
    res.json({ success: false, message: "Ошибка на сервере" });
  }
};

//роут для экспреса
router.post("/", auth, uploadFile);

module.exports = router;
