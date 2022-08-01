import express from "express"
import { auth } from "../middleware/auth.js"
import trackerController from "../controllers/trackerController.js"

const router = express.Router()
//send all data sleep tracker
router.get('/', auth, trackerController.getTrack)
//insert start sleep
router.get('/start', auth, trackerController.startTrack)
//insert stop sleep
router.post('/stop', auth, trackerController.stopTrack)
//delete track
router.get('/delete/:id', auth, trackerController.deleteTrack)
//send form edit track
router.get('/edit/:id', auth, trackerController.editFormTrack)
//edit track
router.post('/edit/:id', auth, trackerController.editTrack)

export default router