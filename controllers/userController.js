import models from '../models/index.js'
import bcrypt from 'bcrypt'
import { generateAccessToken, generateRefreshToken } from '../utils/token.js'

const Users = models.users

class UserController {
    //LOGIN
    static async login(req, res) {
        const { username, password } = req.body
        try {
            //check user have account
            const existingUser = await Users.findOne({
                where: {
                    username: username
                },
                raw: true,
            })
            if (!existingUser) {
                return res.send("Username is invalid")
            }
            //compare the password
            const hashPassword = await bcrypt.compare(password, existingUser.password)
            if (!hashPassword) {
                return res.send("Password is invalid")
            }
            //generate access token and refresh token
            const accessToken = generateAccessToken(existingUser.id)
            const refreshToken = generateRefreshToken(existingUser.id)
            // //set localstorage
            res.cookie('accessToken', accessToken, {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
                httpOnly: true,
                secure: true,
                sameSite: "none"
            })
            //send cookie contain access token
            res.cookie('refreshToken', refreshToken, {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
                httpOnly: true,
                secure: true,
                sameSite: "none"
            })
            //update refresh token
            await Users.update({ refreshToken: refreshToken }, {
                where: {
                    username: username
                }
            })

            console.log(existingUser)

            res.redirect('/track')
        } catch (err) {
            console.log(err.message)
            return res.status(500).send("Login failed")
        }
    }

    //REGISTER
    static async register(req, res) {
        const { username, password } = req.body;
        try {
            //check if username is existing
            const existingUser = await Users.findOne({
                where: {
                    username: username
                },
                raw: true
            })
            if (existingUser) {
                return res.send("Your username was used")
            }
            //hashing password user
            const hashPassword = await bcrypt.hash(password, 10)
            //save data user
            const newUser = await Users.create({
                username: username,
                password: hashPassword
            })
            //generate access token and refresh token
            const accessToken = generateAccessToken(newUser.id)
            const refreshToken = generateRefreshToken(newUser.id)
            //update user to insert refresh token
            await Users.update({ refreshToken: refreshToken }, {
                where: {
                    id: newUser.id
                }
            })
            //send cookie contain access token
            res.cookie('accessToken', accessToken, {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
                httpOnly: true,
                secure: true,
                sameSite: "none"
            })
            //send cookie contain refresh token
            res.cookie('refreshToken', refreshToken, {
                expires: new Date(Date.now() + 1000 * 60 * 5),
                httpOnly: true,
                secure: true,
                sameSite: "none"
            })
            res.redirect('/track')
        } catch (err) {
            console.log(err.message)
            return res.status(500).send("Sign Up failed")
        }
    }

    //LOGOUT
    static async logout(req, res) {
        try {
            res.clearCookie('refreshToken')
            res.clearCookie('accessToken')
            res.redirect('/')
        } catch (err) {
            console.log(err.message)
            return res.status(500).send("Logout failed")
        }
    }
}

export default UserController