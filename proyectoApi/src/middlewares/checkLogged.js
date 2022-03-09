

module.exports = {
    logged: async function user(req, res, next) {

    if (req.session.userLogged) {
        next();
    }
    if (!req.session.userLogged) {
        res.json({
            status: 401,
            message: "No estas logueado"
        })
    }
    },
    notLogged: async function user(req, res,next) {
        if (!req.session.userLogged) {
            next();
        }
        if (req.session.userLogged) {
            res.json({
                status: 401,
                message: "Hay un usuario logueado"
            })
        }
    }

}

