import express from "express"
import userController from "../controllers/userController.js"

const user = express.Router()

//api
user.post('/register', userController.register)
user.post('/login', userController.login)
user.get('/logout', userController.logout)

//form
user.get('/register', (req, res) => res.render('register'))
user.get('/login', (req, res) => res.render('login'))

export default user