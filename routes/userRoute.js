import express from "express"
import { firstAuth } from "../middleware/auth.js"
import userController from "../controllers/userController.js"

const router = express.Router()

//send login form
router.get('/', firstAuth, (req, res) => {
    res.render('login')
})
//route login
router.post('/login', userController.login)
//send register form
router.get('/register', (req, res) => {
    res.render('register')
})
//route register 
router.post('/register', userController.register)
//route logout
router.get('/logout', userController.logout)

export default router