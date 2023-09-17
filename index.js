const mongo = require("mongoose");
const express = require("express");
const app = express();
const fs = require("fs");
app.use(require("cors")());
let nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 60 * 1 * 1000,
  max: 3,
  handler: (req, res) => {
    res
      .status(429)
      .json({ error: true, res: "Shum kerkesa, ju lutem provoni më von" });
  },
});
let user = "notifications@edu.mehmetisai.xyz";
const transporter2 = nodemailer.createTransport({
  host: "smtp.zoho.eu",
  port: 465,
  secure: true,
  auth: {
    user: user,
    pass: "Kosova1!",
  },
});
const port = process.env.PORT || 3000;
let connected = mongo.connect(
  "mongodb+srv://Korabi20:kokimoki123321@shkolla.l3mpojv.mongodb.net/students"
);
const models = require("./models");

connected.then(async (connection) => {
  console.log("DB Connected");
  fs.writeFileSync("nxn.json", JSON.stringify(await models.students.find({})));
});

app.get("/student/:query", async (req, res) => {
  let query = req.params.query;
  if (!query) return res.sendStatus(400);
  query = JSON.parse(query);
  let data = await models.students.findOne(query);
  if (!data) return res.sendStatus(500);
  res.send({ error: false, res: data });
});


app.get("/email/:data", async (req, res) => {
  let data1 = req.params.data;
  if (!data1) return res.sendStatus(400);
  let parsed;
  try {
    parsed = JSON.parse(data1);
  } catch (e) {
    parsed = 1;
  }
  if (parsed == 1) return res.sendStatus(400);
  let data = parsed;
  if (
    !data ||
    !data?.text ||
    !data?.student ||
    !data?.student?.name ||
    !data?.student?.email ||
    !data?.student?.surname
  )
    return res.sendStatus(400);
  let h1 = data.h1 || "Njoftim";
  let full_name = `${data.student.name} ${data.student.surname}`;
  fs.readFile("./test.html", "utf8", (err, file) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    const modifiedContent = file
      .replace("{{full_name}}", full_name)
      .replace("{{h1}}", h1)
      .replace("{{text}}", data.text);
    var mailOptions = {
      from: user,
      to: data.student.email,
      subject: data.title || "Njoftim",
      html: modifiedContent,
    };

    transporter2.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.sendStatus(500);
      } else {
        return res.sendStatus(200);
      }
    });
  });
});

let pws = ["Korabi20!", "MiS123!"];
app.get("/getall/:pw?", limiter, async (req, res) => {
  let pw = req.params.pw;
  if (!pw) return res.sendStatus(400);
  if (!pws.includes(pw)) return res.sendStatus(401);
  let data = await models.students.find({});
  if (!data || !data.length)
    return res.send({ error: true, res: "Nuk ka informacion të nxënësve" });
  res.send({ error: false, res: data });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
