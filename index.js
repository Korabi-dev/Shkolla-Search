const mongo = require("mongoose");
const express = require("express");
const app = express();
const fs = require("fs");
app.use(require("cors")());
let nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");
let pws = ["Korabi20!", "MiS123!"];
const limiter2 = rateLimit({
  windowMs: 120 * 1 * 1000,
  max: 1,
  handler: (req, res) => {
    res
      .status(429)
      .json({ error: true, res: "Shum kerkesa, ju lutem provoni më von" });
  },
});
function customRateLimiter2(req, res, next) {
  if (req.params.pw && req?.params?.pw === pws[0]) {
    return next();
  }
  return limiter(req, res, next);
}

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

app.get("/email/:pw/:data", async (req, res) => {
  let data1 = req.params.data;
  let pw = req.params.pw;
  if (!pw) return res.sendStatus(400);
  if (!pws.includes(pw)) return res.sendStatus(400);
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
  let wm = data?.wm + "<br>" || "-";
  let gender;
  if (data.student.gender.toLowerCase().startsWith("m")) {
    gender = "I";
  }
  if (data.student.gender.toLowerCase().startsWith("f")) {
    gender = "E";
  }
  if (!gender) {
    gender = "I/E";
  }
  fs.readFile("./test.html", "utf8", (err, file) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    const modifiedContent = file
      .replace("{{full_name}}", full_name)
      .replace("{{h1}}", h1)
      .replace("{{text}}", data.text.replace(/\n/g, "<br />"))
      .replace("{{watermark}}", wm)
      .replace("{{gender}}", gender);
    var mailOptions = {
      from: `SH.M.T "Mehmet Isai" <${user}>`,
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
let cache;
app.get("/updatecache/:pw?", customRateLimiter2, async (req, res) => {
  let pw = req.params.pw;
  if (!pw) return res.sendStatus(400);
  if (!pws.includes(pw)) return res.sendStatus(401);
  let data = await models.students.find({});
  if (!data || !data.length)
    return res.send({ error: true, res: "Nuk ka informacion të nxënësve" });
  cache = data;
  res.send({ error: false, res: data });
});
app.get("/getall/:pw?", async (req, res) => {
  let pw = req.params.pw;
  if (!pw) return res.sendStatus(400);
  if (!pws.includes(pw)) return res.sendStatus(401);
  if (!cache) {
    let data = await models.students.find({});
    if (!data || !data.length)
      return res.send({ error: true, res: "Nuk ka informacion të nxënësve" });
    cache = data;
    res.send({ error: false, res: data });
  } else {
    res.send({ error: false, res: cache });
  }
});

const ViberBot = require("viber-bot").Bot;
const BotEvents = require("viber-bot").Events;
const TextMessage = require("viber-bot").Message.Text;
const bot = new ViberBot({
  name: 'SH.M.T "Mehmet Isai"',
  avatar: "https://i.imgur.com/09CYa3f.png",
  authToken: "51a4d9841ea7e1d5-665c8780fde60ef8-1923143e8d7685e1",
});

bot.on(BotEvents.SUBSCRIBED, (response) => {
  console.log(
    `User subscribed: ${response.userProfile.name} ${response.userProfile.id}`
  );
  response.send(
    new TextMessage(
      `I/E dashur ${response.userProfile.name}. Mirsevini ne sistemin e njoftimit të prindve për SH.M.T "Mehmet Isai"!`
    )
  );
});

bot.onTextMessage(/hello|hi/i, (message, response) => {
  response.send(
    new TextMessage(
      `Hello, ${response.userProfile.name}! How can I assist you today?`
    )
  );
});

bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
  console.log(`Message received: ${message.text}`);
});

bot.on(BotEvents.ERROR, (error) => {
  console.error(`Error: ${error}`);
});

app.use("/viber/webhook", bot.middleware());

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
