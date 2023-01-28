import dotenv from "dotenv"
dotenv.config()

//development
// export default {
//     USER: 'root',
//     DB: 'test',
//     PASSWORD: '',
//     HOST: '127.0.0.1',
//     DIALECT: 'mysql',
//     PORT: 3000,
//     SECRET_KEY: 'asobcfouejb298grbcfs'
// }


production
export default {
    HOST: process.env.HOST,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DB: process.env.DB,
    DIALECT: process.env.DIALECT,
    PORT: process.env.PORT,
    SECRET_KEY: process.env.SECRET_KEY
}	