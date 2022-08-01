import dotenv from "dotenv"
dotenv.config()
export default {
    HOST: process.env.HOST,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DB: process.env.DB,
    dialect: process.env.dialect,
    port: process.env.portDB
}	