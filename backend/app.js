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


///////////////////MIDDLEWARES/////////////:

app.use(express.json())
// app.use(cookieParser())



// app.get('/home', (req, res) => {
//    res.render('home', {errorMessage: null})

// })

app.post('/api/edit_profile', async (req, res) => { 
   console.log("editer :", req.body);
   const { email, password, password2, name, avatar } = req.body;

   if (password === password2) {
      const hashedPassword = await bcrypt.hash(password, 3);
      
      let user = await prisma.user.findUnique({
         where: { email }
      });

      if (!user) {
         res.render('edit-profile', { error_message: "Cet utilisateur n'existe pas."});
      } else {
         // Mettre à jour l'utilisateur
         user = await prisma.user.update({
            where: { email },
            data: {
               name, // Mise à jour du nom
               password: hashedPassword, // Mise à jour du mot de passe
               avatar, // Mise à jour de l'avatar
            }
         });
         res.render('s');
      }
   } else {
      res.render('edit-profile', { error_message: 'Les mots de passe sont différents' });
   }
});

// Route GET pour récupérer un utilisateur par son ID
app.get('/api/user/:id' ,async (req, res) => {
   const { id } = req.params
   try {
       const user = await prisma.user.findUnique({
           where: { id: parseInt(id) } // Conversion de l'id en entier
       })
       if (!user) {
           return res.status(404).json({ error: 'Utilisateur non trouvéééé' })
       }
       res.json(user)
   } catch (error) {
       res.status(500).json({ error: 'Erreur serveur', details: error.message })
   }
})


////////////////////////////////////////
const PORT = process.env.PORT || 3005
app.listen(PORT, () => {
   console.log(`Server listening on port http://localhost:${PORT}`)
})