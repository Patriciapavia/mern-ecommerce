import express from 'express'
const router = express.Router()
import asyncHandler from "express-async-handler";
import User from '../models/userModel.js'
import bcypt from "bcryptjs";


router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({ email })

    if(user && user.matchPassword(password)) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: null
      })
    } else {
      res.status(401)
      throw new Error('Invalid email or password')
    }
  
  })
);

export default router