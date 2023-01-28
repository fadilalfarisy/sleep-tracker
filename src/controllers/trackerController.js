import models from "../models/index.js"
import { convertHours, convertHMS } from "../libs/date.js"

const Tracker = models.tracker

const getTrack = async (req, res, next) => {
    const { user_id } = req.session.user
    try {
        const data = await Tracker.findAll({
            where: {
                user_id: user_id
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
        next(err)
    }
}

const startTrack = async (req, res, next) => {
    const { user_id } = req.session.user
    try {
        const data = await Tracker.create({
            user_id: user_id,
            startSleep: Date.now(),
            stopSleep: Date.now(),
            raw: true
        })
        res.render('stopSleep', {
            idTracker: data.tracker_id,
            start: new Date(data.startSleep)
        })
    } catch (err) {
        next(err)
    }
}

const stopTrack = async (req, res, next) => {
    const trackerId = req.body.idTracker
    try {
        await Tracker.update({ stopSleep: Date.now() }, {
            where: {
                tracker_id: trackerId
            }
        })
        res.redirect('/tracker')
    } catch (err) {
        next(err)
    }
}

const deleteTrack = async (req, res, next) => {
    const trackerId = req.params.id
    try {
        await Tracker.destroy({
            where: {
                tracker_id: trackerId
            }
        })
        res.redirect('/tracker')
    } catch (err) {
        next(err)
    }
}

const editFormTrack = async (req, res, next) => {
    const trackerId = req.params.id
    try {
        const data = await Tracker.findOne({
            where: {
                tracker_id: trackerId
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
        next(err)
    }
}

const editTrack = async (req, res, next) => {
    const trackerId = req.params.id

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
                tracker_id: trackerId
            }
        })
        res.redirect('/tracker')
    } catch (err) {
        next(err)
    }
}

const trackerController = {
    getTrack,
    startTrack,
    stopTrack,
    editTrack,
    deleteTrack,
    editFormTrack
}

export default trackerController