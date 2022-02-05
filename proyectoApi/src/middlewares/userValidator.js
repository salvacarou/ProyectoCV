const { body } = require('express-validator');
const db = require('../database/models');

const validations = [
    body('fullName')
        .trim()
        .notEmpty()
        .withMessage('Debe ingresar su nombre completo') 
        .bail()
        .isLength({min:4, max:20})
        .withMessage("Debe tener de 4 a 20 caracteres")
        .bail(),
    body('username')
        .trim()
        .notEmpty()
        .withMessage("Debes completar el campo")
        .bail()
        .isLength({min:4, max:20})
        .withMessage("Debe tener de 4 a 20 caracteres")
        .isAlphanumeric()
        .withMessage('Solo se permite contenido alfanumerico')
        .bail(),
    body('birthdate')
        .not().isEmpty()
        .withMessage("Debes ingresar una fecha")
        .withMessage('Solo se permite contenido alfanumerico')
        .bail(),
    body('email')
        .trim()
        .toLowerCase()
        .notEmpty()
        .withMessage('Debe ingresar algun e-mail')
        .bail()
        .isEmail()
        .withMessage('La dirección de e-mail ingresada no es válida')
        .bail()
        //   https://express-validator.github.io/docs/custom-validators-sanitizers.html
        .custom((value, { req }) => {
          return db.Users.findOne({ where: { email: req.body.email, },
          }).then((user) => {
            if (user) {
              return Promise.reject('Este correo ya existe');
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
        .isAlphanumeric()
        .withMessage('Solo se permite contenido alfanumerico')
        .bail()
        .custom((value, { req }) => {
            if (value !== req.body.confirmPassword) {
              throw new Error('Las contraseñas no coinciden');
            }
            return true;
        }),
    body('confirmPassword')
        .notEmpty()
        .withMessage("Debes completar el campo")
        .bail()
        .isAlphanumeric()
        .withMessage('Solo se permite contenido alfanumerico')
        .bail()
]

module.exports = validations;