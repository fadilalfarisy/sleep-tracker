import express from "express"
import bodyParser from "body-parser"
import session from "express-session"
import router from "./src/routes/index.js"
import config from './src/config/db.js'

const { PORT, SECRET_KEY } = config

const app = express()

//middleware
//set public folder
app.use(express.static(path.join(__dirname, '/views')))
app.use(session({
    secret: SECRET_KEY,
    cookie: { sameSite: 'strict' },
    resave: false,
    saveUninitialized: true
}));
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//routes
app.use(router)
app.get('*', (req, res) => res.render('notFound'))

//error handlers
app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(500).json({
        status: 500,
        message: 'failed',
        info: 'server error'
    });
})

app.listen(PORT, () => console.log(`server running on port ${PORT}`))