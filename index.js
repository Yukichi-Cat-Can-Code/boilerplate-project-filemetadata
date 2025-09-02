require("dotenv").config();
var express = require("express");
var cors = require("cors");
const multer = require("multer");

var app = express();

const port = process.env.PORT || 6366;

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

const upload = multer({ storage: multer.memoryStorage() });

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const { originalname, mimetype, size } = req.file;

  res.json({
    name: originalname,
    type: mimetype,
    size: size,
  });
});

app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
