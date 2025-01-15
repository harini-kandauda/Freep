import "dotenv/config";
import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
// import { v4 as uuidv4 } from 'uuid'

// import { sendMyMail } from './lib/mail.mjs'

const prisma = new PrismaClient();
const app = express();
const codes = {};

app.set("view engine", "ejs");

///////////////////MIDDLEWARES/////////////:

app.use(express.json());
app.use(cookieParser());

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

//   if (user) {
//     const match = await bcrypt.compare(password, user.password);
//   } else {
//     res.sendStatus(403);
//   }

////////////////////////////////////////
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server backend listening on port http://localhost:${PORT}`);
});
