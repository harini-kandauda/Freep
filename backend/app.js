import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
// Sessions UUIDs
import crypto from "crypto";
// Cookie parser
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
const prisma = new PrismaClient();

/////////////////// MIDDLEWARES ///////////////////

app.use(express.json());
app.use(cookieParser());

// List Articles
app.get("/api/clothing", async (req, res) => {
  try {
    const { type, size, genders, state, page = 1, limit = 10 } = req.query;

    const pageInt = parseInt(page);
    const limitInt = parseInt(limit);

    let filters = {};

    if (type) {
      filters.type = type;
    }

    if (size) {
      filters.size = size;
    }

    if (genders) {
      filters.genders = genders;
    }

    if (state) {
      filters.state = state;
    }

    // console.log("Filters envoyés à Prisma:", filters);
    // console.log("Type:", type);
    // console.log("Size:", size);
    // console.log("Genders:", genders);
    // console.log("State:", state);
    const totalClothingFilters = await prisma.clothing.count({
      where: filters,
    });

    const totalPages = Math.ceil(totalClothingFilters / limitInt);

    const clothingList = await prisma.clothing.findMany({
      where: filters,
      skip: (pageInt - 1) * limitInt,
      take: limitInt,
      include: {
        user: true,
        pictures: true, // Inclure l'utilisateur lié à l'article
      },
    });

    res.status(200).json({
      clothingList,
      totalClothingFilters,
      totalPages,
      currentPage: pageInt,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des articles" });
  }
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
      const createUser = await prisma.user.create({
        data: { full_name, email, password: hashedPassword },
      });
      res.sendStatus(200);
    }
  } else {
    res.sendStatus(403);
  }
});

// User authentication

app.post("/auth/authenticate_user", async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    if (await bcrypt.compare(password, existingUser.password)) {
      const uuid = crypto.randomUUID();
      const session = await prisma.session.create({
        data: { session_id: uuid, user_id: existingUser.id },
      });
      res.cookie("auth_user_session_id", session.session_id, {
        httpOnly: true,
        maxAge: 30 * 60 * 1000,
      });
      res.sendStatus(200);
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(404);
  }
});

// Get user from session id

app.get("/auth/get_user", async (req, res) => {
  const session_id = req.cookies.auth_user_session_id;
  if (session_id) {
    try {
      const session = await prisma.session.findUnique({
        where: { session_id: session_id },
        include: { user: true },
      });
      if (session) {
        // console.log("Mon petit user: ", session.user);
        return res.status(200).json({ user: session.user });
      } else {
        return res.sendStatus(402);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  } else {
    return res.sendStatus(403);
  }
});

// Create Article
app.post("/api/create_article", async (req, res) => {
  console.log("req", req);
  const { title, desc, type, size, gender, state, image } = req.body;

  const newArticle = await prisma.clothing.create({
    data: {
      name: title,
      description: desc,
      size: size,
      type: type,
      genders: gender,
      state: state,
      pictures: {
        create: [{ url: image }],
      },
      user: { connect: { id: 4 } },
    },
  });
  console.log("New article : ", newArticle);
  res.sendStatus(200);
});

// Dressing

// List clothing
app.get("/api/dressing", async (req, res) => {
  try {
    const userId = 4; // à remplacer par notre méthode de récupération de l'user id

    const userClothing = await prisma.clothing.findMany({
      where: { user_id: userId },
      include: {
        user: true,
        pictures: true,
      },
    });
    res.status(200).json(userClothing);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Delete clothing
app.delete("/api/dressing/:clothingId", async (req, res) => {
  try {
    const { clothingId } = req.params;

    await prisma.clothing.delete({
      where: { id: parseInt(clothingId) },
    });
    res.status(200).json({ message: "Article supprimé" });
  } catch (error) {
    console.error("Erreur lors de la suppression", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Update clothing
app.put("/api/dressing/:clothingId", async (req, res) => {
  const clothingId = parseInt(req.params.clothingId);
  const { name, description, type, size, genders, state } = req.body;

  try {
    const updatedClothing = await prisma.clothing.update({
      where: { id: clothindId },
      data: {name, description, type, size, genders, state },
    });
    res.json(updatedClothing);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la mise à jour"});
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
// app.get("/api/user/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const user = await prisma.user.findUnique({
//       where: { id: parseInt(id) }, // Conversion de l'id en entier
//     });
//     if (!user) {
//       return res.status(404).json({ error: "Utilisateur non trouvéééé" });
//     }
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: "Erreur serveur", details: error.message });
//   }
// });

////////////////////////////////////////

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
