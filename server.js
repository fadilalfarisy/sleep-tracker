import express from "express"
import dotenv from "dotenv"
import router from "./routes/index.js"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"

dotenv.config()
const app = express()
//set view engine
app.set("view engine", "ejs")
// for parsing application/json
app.use(bodyParser.json())
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
//set up cookie parser
app.use(cookieParser())

app.use(router)
app.get('*', (req, res) => {
    res.render('notFound')
})

//set PORT
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`server running on port ${PORT}`))