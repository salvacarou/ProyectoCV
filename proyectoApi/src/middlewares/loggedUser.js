async function userLogM(req, res, next) {

    res.locals.isLogged = false
    if (req.session.userLogged) {
        res.locals.isLogged = true
        res.locals.userInLog = req.session.userLogged
    }
    next();
}

module.exports = userLogM