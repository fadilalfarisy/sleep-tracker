import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import models from "../models/index.js"
import { generateAccessToken } from "../utils/token.js"

const Users = models.users
dotenv.config()

//auth jwt token
const auth = async (req, res, next) => {
    try {
        //check cookie is available
        if (!req.cookies) {
            return res.redirect('/')
        }
        //check access token is available
        if (!req.cookies.accessToken) {
            return res.redirect('/')
        }
        const token = req.cookies.accessToken
        //decode access token
        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        //set req token
        req.token = decodeToken
        return next()
    } catch (err) {
        console.log(err.message)
        return checkRefreshToken(req, res, next)
    }
}
//check refresh token is still valid
const checkRefreshToken = async (req, res, next) => {
    try {
        //check access token is available
        if (!req.cookies.refreshToken) {
            return res.redirect('/')
        }
        const token = req.cookies.refreshToken
        //decode access token
        const decodeToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
        const data = await Users.findOne({
            where: {
                refreshToken: token
            }
        })
        if (data) {
            const accessToken = generateAccessToken(data.id)
            res.cookie('accessToken', accessToken, {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
                httpOnly: true,
                secure: true,
                sameSite: "none"
            })
            //set req token
            req.token = { username: data.username }
            return next()
        }
        return res.redirect('/')
    } catch (err) {
        console.log(err.message)
        return res.redirect('/')
    }
}
//first auth user
const firstAuth = async (req, res, next) => {
    try {
        //check cookie is available
        if (!req.cookies) {
            return next()
        }
        //check access token is available
        if (!req.cookies.accessToken) {
            return next()
        }
        const token = req.cookies.accessToken
        //decode access token
        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        return res.redirect('/track')
    } catch (err) {
        console.log(err.message)
        return checkRefreshTokenFirst(req, res, next)
    }
}
//check first refresh token 
const checkRefreshTokenFirst = async (req, res, next) => {
    try {
        //check access token is available
        if (!req.cookies.refreshToken) {
            return next()
        }
        const token = req.cookies.refreshToken
        //decode access token
        const decodeToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
        const data = await Users.findOne({
            where: {
                refreshToken: token
            }
        })
        if (data) {
            const accessToken = generateAccessToken(data.id)
            res.cookie('accessToken', accessToken, {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
                httpOnly: true,
                secure: true,
                sameSite: "none"
            })
            return res.redirect('/track')
        }
        return next()
    } catch (err) {
        console.log(err.message)
        return next()
    }
}

export {
    auth,
    firstAuth,
}