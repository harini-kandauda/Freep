// app.js 
import 'dotenv/config'
import express from 'express'

import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcryptjs'
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
   const { email, password, password2, full_name, avatar_url } = req.body;

   if (password !== password2) {
      return res.status(400).json({ error_message: "Les deux mots de passe ne sont pas identiques." });
   }
   try {
      const hashedPassword = await bcrypt.hash(password, 3);
      let user = await prisma.user.findUnique({
         where: { email }
      });
      if (!user) {
         return res.status(404).json({ error_message: "Cet utilisateur n'existe pas." });
      }

      // Mettre à jour l'utilisateur
      user = await prisma.user.update({
         where: { email },
         data: {
            full_name, // Mise à jour du nom complet
            password: hashedPassword, // Mise à jour du mot de passe
            avatar_url, // Mise à jour de l'avatar
         }
      });

      return res.status(200).json({ success_message: "Votre profil a été mis à jour avec succès." });
   } catch (error) {
      return res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur', details: error.message });
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