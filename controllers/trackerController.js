import models from "../models/index.js"
import { convertHours, convertHMS } from "../utils/date.js"

const Tracker = models.tracker

class trackerController {
    //GET TRACK
    static async getTrack(req, res) {
        const idUser = req.token.id
        try {
            const data = await Tracker.findAll({
                where: {
                    idUser: idUser
                }, order: [
                    ['startSleep', 'DESC'],
                ],
            })

            let min = 0
            let max = 0
            let average = 0

            if (data.length !== 0) {
                min = 1000000
                max = 0
                average = 0

                data.forEach(element => {
                    let duration = element.stopSleep - element.startSleep
                    if (min > duration) { min = duration }
                    if (max < duration) { max = duration }

                    average += duration
                });

                average /= data.length
            }

            res.render('home', {
                response: data,
                max: max,
                min: min,
                average: average,
                convertHMS: convertHMS,
                convertHours: convertHours
            })
        } catch (err) {
            console.log(err.message)
            return res.status(500).send('Error')
        }
    }

    //START TRACK
    static async startTrack(req, res) {
        try {
            const data = await Tracker.create({
                idUser: req.token.id,
                startSleep: Date.now(),
                stopSleep: Date.now(),
                raw: true
            })
            res.render('stopSleep', {
                idTracker: data.id,
                start: new Date(data.startSleep)
            })
        } catch (err) {
            console.log(err.message)
            return res.status(500).send('failed to start count')
        }
    }

    //STOP TRACK
    static async stopTrack(req, res) {
        const idTracker = req.body.idTracker
        try {
            await Tracker.update({ stopSleep: Date.now() }, {
                where: {
                    id: idTracker
                }
            })
            res.redirect('/track')
        } catch (err) {
            console.log(err.message)
            return res.status(500).send('failed to stop count')
        }
    }

    //DELETE TRACK
    static async deleteTrack(req, res) {
        const idTracker = req.params.id
        try {
            await Tracker.destroy({
                where: {
                    id: idTracker
                }
            })
            res.redirect('/track')
        } catch (err) {
            console.log(err.message)
            return res.status(500).send('failed to stop count')
        }
    }

    //SET EDIT FORM TRACK
    static async editFormTrack(req, res) {
        const idTracker = req.params.id
        try {
            const data = await Tracker.findOne({
                where: {
                    id: idTracker
                }
            })

            const startSleep = data.startSleep
            const stopSleep = data.stopSleep

            const start = {
                year: new Date(startSleep).getFullYear(),
                month: new Date(startSleep).getMonth() + 1,
                day: new Date(startSleep).getDate(),
                hours: new Date(startSleep).getHours(),
                minutes: new Date(startSleep).getMinutes(),
                seconds: new Date(startSleep).getSeconds()
            }

            const stop = {
                year: new Date(stopSleep).getFullYear(),
                month: new Date(stopSleep).getMonth() + 1,
                day: new Date(stopSleep).getDate(),
                hours: new Date(stopSleep).getHours(),
                minutes: new Date(stopSleep).getMinutes(),
                seconds: new Date(stopSleep).getSeconds()
            }

            res.render('editTracker', {
                response: data,
                start: start,
                stop: stop
            })
        } catch (err) {
            console.log(err.message)
            return res.status(500).send('failed to stop count')
        }
    }

    //EDIT TRACK
    static async editTrack(req, res) {
        const idTracker = req.params.id

        const {
            startDay,
            startMonth,
            startYear,
            startHours,
            startMinutes,
            startSeconds,
            stopDay,
            stopMonth,
            stopYear,
            stopHours,
            stopMinutes,
            stopSeconds
        } = req.body

        const startSleep = new Date(
            startYear,
            startMonth - 1,
            startDay,
            startHours,
            startMinutes,
            startSeconds
        ).getTime()

        const stopSleep = new Date(
            stopYear,
            stopMonth - 1,
            stopDay,
            stopHours,
            stopMinutes,
            stopSeconds
        ).getTime()

        try {
            await Tracker.update({
                startSleep: startSleep,
                stopSleep: stopSleep
            }, {
                where: {
                    id: idTracker
                }
            })
            res.redirect('/track')
        } catch (err) {
            console.log(err.message)
            return res.status(500).send('failed to stop count')
        }
    }
}

export default trackerController