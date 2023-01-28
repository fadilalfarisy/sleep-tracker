const convertHours = (value) => {
    const date = new Date(value)
    let hours = date.getHours()
    let minutes = date.getMinutes()
    if (hours < 10) { hours = `0${hours}` }
    if (minutes < 10) { minutes = `0${minutes}` }
    return `${hours}:${minutes}` // return HH:MM
}

const convertHMS = (value) => {
    let sec = Math.floor(value / 1000) // delete decimal number and convert milisecond to second
    let hours = Math.floor(sec / 3600) // get hours
    let minutes = Math.floor((sec - (hours * 3600)) / 60) // get minutes
    let seconds = sec - (hours * 3600) - (minutes * 60) //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (hours < 10) { hours = `0${hours}` }
    if (minutes < 10) { minutes = `0${minutes}` }
    if (seconds < 10) { seconds = `0${seconds}` }
    return `${hours} : ${minutes} : ${seconds}` // Return is HH : MM : SS
}

export {
    convertHMS,
    convertHours
}