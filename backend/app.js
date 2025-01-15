import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

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

////////////////////////////////////////

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
