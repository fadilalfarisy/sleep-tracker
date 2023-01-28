import express from "express"
import auth from "../middleware/auth.js"
import trackerController from "../controllers/trackerController.js"

const router = express.Router()

//api
router.get('/tracker', auth, trackerController.getTrack)
router.post('/tracker-delete/:id', auth, trackerController.deleteTrack)
router.post('/tracker-edit/:id', auth, trackerController.editTrack)
router.post('/tracker/start', auth, trackerController.startTrack)
router.post('/tracker/stop', auth, trackerController.stopTrack)

//form
router.get('/tracker-edit/:id', auth, trackerController.editFormTrack)


export default router