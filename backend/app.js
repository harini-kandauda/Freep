import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const app = express();
dotenv.config();
const prisma = new PrismaClient();
app.use(express.json());

/////////////////// MIDDLEWARES ///////////////////

// Create Article
app.post("/api/create_article", async (req, res) => {
  console.log("req", req);
  const { title, desc, type, size, gender, state, image } = req.body;

  const newArticle = await prisma.Clothing.create({
    data: {
      name: title,
      description: desc,
      size: size,
      type: type,
      genders: gender,
      state: state,
      pictures: {
        create: [{url : image}]
      },
      user: {connect: {id : 4}}
    },
  });
  console.log("New article : ", newArticle);
  res.sendStatus(200);
});

// List Articles
app.get("/api/clothing", async (req, res) => {
  const clothingData = await prisma.clothing.findMany({
    include: {
      user: true,
      pictures: true,
    },
  });
  res.json(clothingData);
});

// Create account
app.post("/api/signup", async (req, res) => {
  const { full_name, email, password, password2 } = req.body;

  if (password === password2) {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.sendStatus(400);
    } else {
      const hashedPassword = await bcrypt.hash(password, 3);
      const createUser = await prisma.User.create({
        data: { full_name, email, password: hashedPassword },
      });
      res.sendStatus(200);
    }
  } else {
    res.sendStatus(403);
  }
});

// Edit Profile

app.post("/api/edit_profile", async (req, res) => {
  console.log("editer :", req.body);
  const { email, password, password2, full_name, avatar_url } = req.body;

  if (password !== password2) {
    return res.status(400).json({
      error_message: "Les deux mots de passe ne sont pas identiques.",
    });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 3);
    let user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res
        .status(404)
        .json({ error_message: "Cet utilisateur n'existe pas." });
    }

    // Mettre à jour l'utilisateur
    user = await prisma.user.update({
      where: { email },
      data: {
        full_name, // Mise à jour du nom complet
        password, // Mise à jour du mot de passe
        avatar_url, // Mise à jour de l'avatar
      },
    });
    return res
      .status(200)
      .json({ success_message: "Votre profil a été mis à jour avec succès." });
  } catch (error) {
    return res.status(500).json({
      error: "Erreur lors de la mise à jour de l'utilisateur",
      details: error.message,
    });
  }
});

// Route GET pour récupérer un utilisateur par son ID
app.get("/api/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) }, // Conversion de l'id en entier
    });
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvéééé" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur", details: error.message });
  }
});

////////////////////////////////////////

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
