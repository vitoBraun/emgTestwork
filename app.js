require("dotenv").config();
const express = require("express");

const app = express();
const path = require("path");
const mongoose = require("mongoose");
const upload = require("express-fileupload");

app.use(express.json({ extended: true }));
app.use(upload({}));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/upload", require("./routes/upload.routes"));

app.use("/api/lastfile", require("./routes/lastfile.routes"));
app.use("/", express.static(path.join(__dirname, "client", "build")));
app.use("*", express.static(path.join(__dirname, "client", "build")));

const PORT = process.env.PORT;

async function start() {
  try {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => {
      console.log(`App started. http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log("Server error ", e.message);
    process.exit(1);
  }
}

start();
