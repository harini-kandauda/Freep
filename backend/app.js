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
  const { title, desc } = req.body;
  res.sendStatus(200);

  const newArticle = await prisma.Clothing.create({
    data: {
      name: title,
      description: desc,
    },
  });
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

////////////////////////////////////////

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
