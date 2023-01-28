import express from "express"
import auth from "../middleware/auth.js"
import user from "./userRoute.js"
import tracker from "./trackerRoute.js"

const router = express.Router()

//check session user 
router.get('/', auth, (req, res, next) => {
    if (req.session.authorized) {
        res.redirect('/tracker')
    }
    else {
        res.redirect('/login')
    }
})

router.use('/', user)
router.use('/', tracker)

export default router