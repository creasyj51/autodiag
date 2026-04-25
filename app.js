const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.type("text").send("Serveur AutoDiag OK");
});

// 🔥 ROUTE TEST (tu peux cliquer dessus dans le navigateur)
app.get("/test-mail", async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "creasyjesterdesign@gmail.com",
        pass: "JiMc@rrey51170"
      }
    });

    await transporter.sendMail({
      from: "AutoDiag <creasyjesterdesign@gmail.com>",
      to: "creasyj51@gmail.com",
      subject: "🚀 Test AutoDiag",
      text: "Si tu reçois ce mail, tout fonctionne parfaitement 👍"
    });

    res.send("MAIL TEST ENVOYÉ !");
  } catch (e) {
    console.error(e);
    res.status(500).send("ERREUR TEST");
  }
});

// 🔥 ROUTE NORMALE (utilisée par ton formulaire)
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
        user: "creasyjesterdesign@gmail.com",
        pass: "JiMc@rrey51170"
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
      from: "AutoDiag <creasyjesterdesign@gmail.com>",
      to: "creasyj51@gmail.com",
      subject: "Nouveau signalement AutoDiag - " + immat,
      text: texte
    });

    res.status(200).send("OK");
  } catch (e) {
    console.error(e);
    res.status(500).send("ERREUR");
  }
});

app.listen(port, () => {
  console.log("Serveur AutoDiag en ecoute sur le port " + port);
});
