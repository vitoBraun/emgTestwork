const { Router } = require("express");
const File = require("../models/File");
const router = Router();

router.get("/", async (req, res) => {
  try {
    // находим последний добавленный файл в БД
    const file = await File.findOne().sort({ created_at: -1 });

    // отправляем json ответ с данными о файле
    res.json({
      link: file.link,
      text: file.text,
      created_at: file.created_at,
      userId: file.userId,
    });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так на сервере" });
  }
});

module.exports = router;
