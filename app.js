const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
const port = process.env.PORT || 3001;

// 🔐 CONFIG
const SMTP_USER = "creasyjesterdesign@gmail.com";
const SMTP_PASS = "updscongwdjndtoi";
const EMAIL_TO = "creasyj51@gmail.com";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔹 ROUTE TEST
app.get("/", (req, res) => {
  res.type("text").send("Serveur AutoDiag OK");
});

// 🔹 TEST MAIL
app.get("/test-mail", async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: "AutoDiag <" + SMTP_USER + ">",
      to: EMAIL_TO,
      subject: "TEST AutoDiag",
      text: "Si tu reçois ce mail, tout fonctionne 💪"
    });

    res.send("MAIL ENVOYÉ");
  } catch (e) {
    console.error(e);
    res.status(500).send("ERREUR MAIL");
  }
});

// 🔹 SIGNALMENT (UNE SEULE FOIS !)
app.post("/signalement", async (req, res) => {
  try {
    const immat = req.body.immat || "";
    const priorite = req.body.priorite || "";
    const nature = req.body.nature || "";
    const localisation = req.body.localisation || "";
    const description = req.body.description || "";
    const centre = req.body.centre || "";

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      }
    });

    const texte =
      "Nouveau signalement AutoDiag\n\n" +
      "Centre : " + centre + "\n" +
      "Immatriculation : " + immat + "\n" +
      "Priorité : " + priorite + "\n" +
      "Nature : " + nature + "\n" +
      "Localisation : " + localisation + "\n" +
      "Description : " + description + "\n";

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

// 🔹 LANCEMENT SERVEUR (UNE SEULE FOIS !)
app.listen(port, () => {
  console.log("Serveur AutoDiag en ecoute sur le port " + port);
});
