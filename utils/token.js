import jwt from "jsonwebtoken"

//generate access token
const generateAccessToken = (id) => {
    return jwt.sign({ id: id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
}
//generate refresh token
const generateRefreshToken = (id) => {
    return jwt.sign({ id: id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

export {
    generateAccessToken,
    generateRefreshToken
}