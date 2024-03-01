import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/userModel.js';


const router = express.Router()

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body
    console.log(username, email, password)

    try {
        const alreadyUser = await UserModel.findOne({ "username": username }) || await UserModel.findOne({ "email": email })
        const hashedPassword = await bcrypt.hash(password, 10)

        if (alreadyUser) {
            throw new Error("User Already Exists!")
        }

        await UserModel.insertMany({
            "username": username,
            "email": email,
            "password": hashedPassword
        })
        res.send("Registration Successful")

    } catch (error) {

        res.send(error.message)

    }


})

router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await UserModel.findOne({ "username": username });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({ userId: user._id }, process.env.SECRECT_KEY, { expiresIn: '1h' });
      res.json({ "token": token, "userID": user._id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  


router.get("/auth", (req, res) => {

    const token = req.header.token;
    console.log(req.header)

    if (token) {
        const decode = jwt.verify(token, SECRECT_KEY);
        res.json({
            login: true,
            data: decode,
        });
    } else {
        res.json({
            login: false,
            data: "error",
        });
    }
});



export { router as Authentication }