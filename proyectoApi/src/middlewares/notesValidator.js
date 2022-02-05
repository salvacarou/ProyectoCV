const { body } = require('express-validator');
const db = require('../database/models');

const validations = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage("Debes completar el campo")
        .bail()
        .isLength({min:4, max:20})
        .withMessage("Debe tener de 4 a 20 caracteres")
        // .isAlphanumeric()
        // .withMessage('Solo se permite contenido alfanumerico')
        .bail(),
    body('text')
        .not().isEmpty()
        .withMessage("Debes ingresar el texto")
        .bail(),
    body('categoryId')
        .trim()
        .notEmpty()
        .withMessage("Debes completar el campo")
        .bail()
        .isLength({min:1, max:5})
        .withMessage("Debe tener de 4 a 20 caracteres")
        .isAlphanumeric()
        .withMessage('Solo se permite contenido alfanumerico')
        .bail(),
    body('userId')
        .trim()
        .notEmpty()
        .withMessage("Debes completar el campo")
        .bail()
        .isLength({min:1, max:5})
        .withMessage("Debe tener de 4 a 20 caracteres")
        .isAlphanumeric()
        .withMessage('Solo se permite contenido alfanumerico')
        .bail()
]

module.exports = validations;