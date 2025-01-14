import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

const app = express();
dotenv.config();
const prisma = new PrismaClient();
// body parser
app.use(express.urlencoded({ extended: true }));
// JSON parser
app.use(express.json());

/////////////////// MIDDLEWARES ///////////////////

// Create Article
app.post("/api/create_article", async (req, res) => {
  const { title, desc } = req.body;
  // Log des données reçues
  console.log("Données reçues : ", { title, desc });
  res.sendStatus(200);

  const newArticle = await prisma.Clothing.create({
    data: {
      name: title,
      description: desc,
    },
  });
  console.log("Article created:", newArticle);
});

////////////////////////////////////////

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
