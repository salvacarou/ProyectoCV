const { body } = require('express-validator');
const db = require('../database/models');

const validations = [
body('email')
.trim()
.notEmpty()
.withMessage('Debe ingresar algun e-mail')
.bail()
.isEmail()
.withMessage('La dirección de e-mail ingresada no es válida')
.bail()
.custom((value, { req }) => {
    return db.Users.findOne({ where: { email: req.body.email, },
    }).then((user) => {
      if (!user) {
        return Promise.reject('Este correo no esta asociado a ninguna cuenta');
        // return true
      }
    });
  }),
body('password')
.trim()
.notEmpty()
.withMessage('Debe ingresar una contraseña')
.bail()
.isLength({ min:4 })
.withMessage("La contraseña debe tener por lo menos 4 caracteres")
.bail()
]


module.exports = validations;