const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
const port = process.env.PORT || 3001;

// CONFIG
const SMTP_USER = "creasyjesterdesign@gmail.com";
const SMTP_PASS = "updscongwdjndtoi";
const EMAIL_TO = "creasyj51@gmail.com";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function createMailer() {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    }
  });
}

app.get("/", (req, res) => {
  res.type("text").send("Serveur AutoDiag OK");
});

app.get("/test-mail", async (req, res) => {
  try {
    const transporter = createMailer();

    await transporter.sendMail({
      from: "AutoDiag <" + SMTP_USER + ">",
      to: EMAIL_TO,
      subject: "TEST AutoDiag",
      text: "Si tu reçois ce mail, tout fonctionne."
    });

    res.send("MAIL ENVOYÉ");
  } catch (e) {
    console.error(e);
    res.status(500).send("ERREUR MAIL");
  }
});

app.post("/signalement", async (req, res) => {
  try {
    const immat = req.body.immat || "";
    const priorite = req.body.priorite || "";
    const nature = req.body.nature || "";
    const localisation = req.body.localisation || "";
    const description = req.body.description || "";
    const centre = req.body.centre || "";

    const texte =
      "Nouveau signalement AutoDiag\n\n" +
      "Centre : " + centre + "\n" +
      "Immatriculation : " + immat + "\n" +
      "Priorité : " + priorite + "\n" +
      "Nature : " + nature + "\n" +
      "Localisation : " + localisation + "\n" +
      "Description : " + description + "\n";

    const transporter = createMailer();

    await transporter.sendMail({
      from: "AutoDiag <" + SMTP_USER + ">",
      to: EMAIL_TO,
      subject: "Nouveau signalement AutoDiag - " + immat,
      text: texte
    });

    res.send("OK");
  } catch (e) {
    console.error(e);
    res.status(500).send("ERREUR");
  }
});

app.listen(port, () => {
  console.log("Serveur AutoDiag en ecoute sur le port " + port);
});
