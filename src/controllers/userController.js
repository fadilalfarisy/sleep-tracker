import db from '../models/index.js'
import bcrypt from 'bcrypt'

const Users = db.users

const login = async (req, res, next) => {
    const { username, password } = req.body
    try {
        //check username is exist
        const existingUser = await Users.findOne({
            where: { username: username },
            raw: true,
        })
        if (!existingUser) {
            return res.status(400).send("Username is invalid")
        }

        //compare the password
        const hashPassword = await bcrypt.compare(password, existingUser.password)
        if (!hashPassword) {
            return res.status(400).send("Password is invalid")
        }

        //setting session
        req.session.user = existingUser;
        req.session.authorized = true;

        res.redirect('/tracker')
    } catch (err) {
        next(err)
    }
}

const register = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        console.log(req.body)
        //check username is exist
        const existingUser = await Users.findOne({
            where: { username: username },
            raw: true
        })
        if (existingUser) {
            return res.status(400).send("Your username was used")
        }

        //hashing password user
        const hashPassword = await bcrypt.hash(password, 10)
        //save data user
        const newUser = await Users.create({
            username: username,
            password: hashPassword
        })

        //setting session
        req.session.user = newUser;
        req.session.authorized = true;

        res.redirect('/tracker')
    } catch (err) {
        next(err)
    }
}

const logout = async (req, res, next) => {
    try {
        //destroy session
        req.session.destroy()

        res.redirect('/login')
    } catch (err) {
        next(err)
    }
}

const userController = {
    register,
    login,
    logout
}

export default userController