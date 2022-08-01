import express from "express"
import userRoute from "./userRoute.js"
import trackerRoute from "./trackerRoute.js"

const rootRouter = express.Router()
//user routes
rootRouter.use('/', userRoute)
//crud routes
rootRouter.use('/track', trackerRoute)

export default rootRouter