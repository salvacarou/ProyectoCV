const { Users } = require("../database/models");
const { Note_user_fav } = require("../database/models");
const bcryptjs = require('bcryptjs');
const { validationResult } = require("express-validator");



const controller = {
    list: async (req, res) => {
        const usersList = await Users.findAll({where: {deleted : false}});
        
        const users = usersList.map((userr) => { 
            return { 
                id: userr.id,
                fullName: userr.fullName,
                email: userr.email,
                url: "http://localhost:3001/api/users/" + userr.id
             }
         })

        res.json({
            meta:{
                status: 200,
                menu: "http://localhost:3001/api",
                notes: "http://localhost:3001/api/notes",
                count: users.length,
                url: "http://localhost:3001/api/users/",
                usuariosEliminados: "http://localhost:3001/api/deletedUsers/"
            },
            data:{
                users
            }
        })
    },
    deletedUsers: async (req, res) => {
        const usersList = await Users.findAll({where: {deleted : true}});
        
        const users = usersList.map((userr) => { 
            return { 
                id: userr.id,
                fullName: userr.fullName,
                email: userr.email,
                url: "http://localhost:3001/api/users/" + userr.id
                
             }
         })

        res.json({
            meta:{
                status: 200,
                count: users.length,
                url: "http://localhost:3001/api/deletedUsers/",
                usuarios: "Eliminados",
                usuariosVigentes: "http://localhost:3001/api/users/"
            },
            data:{
                users
            }
        })

    },
    detail: async (req, res) => {
        const user = await Users.findByPk(req.params.id, {include: ["notes", "favnote"]})

        const userNotes = user.notes.map((notes) => { // Notas creadas por este usuario (asociacion de una a muchos)
            return { 
                id: notes.id,
                name: notes.name,
                deleted: (notes.deleted[0] == false) ? false : true ,
                url: "http://localhost:3001/api/notes/" + notes.id
                
             }
         })

         const userFavs = user.favnote.map((notes) => { // favoritos (asociacion de muchos a muchos)
            return { 
                id: notes.id,
                name: notes.name,
                deleted: (notes.deleted[0] == false) ? false : true ,
                url: "http://localhost:3001/api/notes/" + notes.id
                
             }
         })
         const currentFavNotes = userFavs.filter((dele) => {
            return dele.deleted == 0
        })

         const currentNotes = userNotes.filter((dele) => {
             return dele.deleted == 0
         })
         const deletedNotes = userNotes.filter((dele) => {
            return dele.deleted == 1
        })
         
        if (user) {
            res.json({
             data: {
                 id: user.id,
                 fullName: user.fullName,
                 username: user.username,
                 email: user.email,
                 birthdate: user.birthdate,
                 image: "http://localhost:3001/public/images/users/" + user.image,
                 deleted: user.deleted.data,
             },
                UserNotes: {
                    totalNotescount: userNotes.length,
                    currentNotesCount: currentNotes.length,
                    currentNotesList: currentNotes,
                    deletedNotesCount: deletedNotes.length,
                    deletedNotesList: deletedNotes
             },
                FavNotes: {
                    favoriteNotes: currentFavNotes
                },
             meta: {
                 status: 200,
                 url: "http://localhost:3001/api/users/" + user.id,
                 fullList: "http://localhost:3001/api/users/"
             }
         }) 

         } else {
             res.json({
                 Problema: "No se encontro el usuario",
                 meta : {
                     status: 404,
                     url: "http://localhost:3001/api/users/" + req.params.id,
                 },
                 data:  `No se encontró el usuario de id: ${req.params.id}`,
                 fullList: "http://localhost:3001/api/users"
             })
         }
    },
    create: async (req, res) => {
        const resultValidation = validationResult(req)

        if (resultValidation.errors.length == 0) {
            const biggestId = await Users.max("id")
            const newUser = await Users.create({
            id : biggestId + 1,
            fullName : req.body.fullName,
            username : req.body.username,
            email : req.body.email,
            birthdate: req.body.birthdate,
            image: req.body.image,
            password: bcryptjs.hashSync(req.body.password, 10),
            deleted : 0
        })
        res.redirect("/api/users")
       }

       if (resultValidation) {
        res.json({
            Problem: "Error en la introduccion de datos",
            fullList: "http://localhost:3001/api/users",
            resultValidation
        })
       }
    },
    delete: async (req, res) => {

        const userSearch = await Users.findOne({ where: { id : req.params.id }})
        if (userSearch) {
            await Users.update({
                deleted: 1
            }, { where : {id : req.params.id} })
        } else {
            res.json({
                Problema : "No se encontro el usuario"
            })
        }

        res.redirect("/api/users")
    },
    edit: async (req, res) => {
        const userSearch = await Users.findOne({ where: { id : req.params.id }})
        console.log(req.body)
        // console.log(userSearch.id)
    if (userSearch) {
        const userEdited = await Users.update({
            fullName : req.body.fullName ? req.body.fullName : userSearch.fullName,
            username : req.body.username ? req.body.username : userSearch.username,
            email : req.body.email ? req.body.email : userSearch.email,
            birthdate: req.body.birthdate ? req.body.birthdate : userSearch.birthdate,
            image: req.body.image ? req.body.image : userSearch.image,
            password: req.body.password ? req.body.password : userSearch.password,
            }, {
            where: { id : req.params.id}
            })
    } else {
        res.json({
            Problema: "No se encontro el usuario"
        })
    }
        res.redirect("/api/users/" + req.params.id )
    }
}

module.exports = controller