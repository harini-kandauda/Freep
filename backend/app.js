// app.js 
import 'dotenv/config'
import express from 'express'
import { PrismaClient } from "@prisma/client"
// import bcrypt from 'bcryptjs'
// import cookieParser from 'cookie-parser'
// import { v4 as uuidv4 } from 'uuid'


// import { sendMyMail } from './lib/mail.mjs'

const prisma = new PrismaClient();
const app = express();

// const codes = {};

app.set('view engine', 'ejs')

///////////////////MIDDLEWARES/////////////:

app.use(express.json())
// app.use(cookieParser())


// app.get('/home', (req, res) => {
//    res.render('home', {errorMessage: null})

// })

app.get('/api/clothing', async (req, res) =>{
   const clothingData = await prisma.clothing.findMany({
      include: {
         user: true,
         pictures: true,
      },
   });
   res.json(clothingData);
});


////////////////////////////////////////
const PORT = process.env.PORT || 3005
app.listen(PORT, () => {
   console.log(`Server listening on port http://localhost:${PORT}`)
})