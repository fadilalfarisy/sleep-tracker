const auth = async (req, res, next) => {
    if (req.session.authorized) {
        next()
    }
    else {
        res.redirect('/login')
    }
}

export default auth