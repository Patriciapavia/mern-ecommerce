import express from 'express'
const router = express.Router()
import asyncHandler from "express-async-handler";
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import protect from '../middleware/authMiddleware.js'


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
        token: generateToken(user._id)
      })
    } else {
      res.status(401)
      throw new Error('Invalid email or password')
    }
  
  })
);


// @desc GET user profile

// @route GET /users/profile

//@ access private

router.get(
  "/profile", protect ,
  asyncHandler(async (req, res) => {
     const user = await User.findById(req.user._id)
     if(user){
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      })
     } else {
       res.status(404)
       throw new Error('Invalid email or password')
     }
  })
);

// @desc  user profile

// @route PUT api/users/profile

//@ access private

router.put(
  "/profile", protect ,
  asyncHandler(async (req, res) => {
     const user = await User.findById(req.user._id)
    
     if(user){
      user.name = req.body.name || user.name; 
      user.email = req.body.email || user.email
       if(req.body.password){
        user.password = req.body.password
       }

       const updatedUser = await user.save()
       res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id)
      })
     } else {
       res.status(404)
       throw new Error('Invalid email or password')
     }
  })
);

// @desc register a new user

// @route POST /api/users

//@ access private

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const {name, email, password} = req.body
    const userExists = await User.findOne({ email })
    if(userExists) {
      res.status(400)
      throw new Error('user already exist')
    } else {
      const user = await User.create({ name, email, password })
      if(user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id)

        })
      } else {
        res.staus(400)
        throw new Error('Invalid user data')
      }
    }
  })
);



export default router