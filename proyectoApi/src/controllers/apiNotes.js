const { all } = require("express/lib/application");
const { Notes } = require("../database/models");
const { Users } = require("../database/models");
const { Note_user_fav } = require("../database/models");
const { validationResult } = require("express-validator");
const req = require("express/lib/request");


const controller = {
    list: async (req, res) => {
        const notesList = await Notes.findAll({where : {deleted : false}, include:["users", "userfaved"]})
        const allNotes = notesList.map((notes) => {     
                return {
                id: notes.id,
                name: notes.name,
                favCount: notes.userfaved.length,
                url: "http://localhost:3001/api/notes/" + notes.id,
            }    
        })

        const mostFavs = notesList.sort(function (a, b) {
            if (a.userfaved.length > b.userfaved.length) {
                return -1;
            }
            if (a.userfaved.length < b.userfaved.length) {
                return 1
            }
            return 0
        })

        res.json({
            meta: {
                status: 200,
                menu: "http://localhost:3001/api",
                users: "http://localhost:3001/api/users",
                count: allNotes.length,
                url: "http://localhost:3001/api/notes",
                notasEliminadas: "http://localhost:3001/api/deletedNotes",
                mostFavs: {
                    id: mostFavs[0].id,
                    name: mostFavs[0].name,
                    favCount: mostFavs[0].userfaved.length,
                    url: "http://localhost:3001/api/notes/" + mostFavs[0].id,
                }
            },
            data: allNotes
        })
    },
    deletedNotes: async (req, res) => {
        const notesList = await Notes.findAll({where : {deleted : true}})
        const allNotes = notesList.map((notes) => {
            return {
                id: notes.id,
                name: notes.name,
                url: "http://localhost:3001/api/notes/" + notes.id
            }
        })

        res.json({
            meta: {
                status: 200,
                count: allNotes.length,
                url: "http://localhost:3001/api/deletedNotes",
                aclaracion: "Estas notas estan eliminadas",
                notasVigentes: "http://localhost:3001/api/notes"
            },
            data: allNotes
        })
    },
    detail: async (req, res) => {
        const note = await Notes.findByPk(req.params.id, {include: ["category", "users", "userfaved"]}) 

        if (note) {
            res.json({
                data: {
                    id : note.id,
                    name : note.name,
                    category: note.category.name,
                    text: note.text,
                    favCount : note.userfaved.length,
                    image: note.image,
                    deleted: note.deleted[0] == 0 ? false : true,
                    creator: note.users.fullName,
                    userId: note.userId,
                    userUrl: "http://localhost:3001/api/users/" + note.users.id
                },
                meta: {
                    status: 200,
                    url: "http://localhost:3001/api/notes/" + note.id,
                    fullList: "http://localhost:3001/api/notes"
                }
            })
        } else {
            res.json({
                Problem: "No se encontro la nota",
                meta : {
                    status: 404,
                    url: "http://localhost:3001/api/notes/" + req.params.id,
                },
                data:  `No se encontró la nota de id: ${req.params.id}`,
                fullList: "http://localhost:3001/api/notes"
            })
        }
    },
    create: async (req, res) => {
        const resultValidation =  validationResult(req)
        
        if (resultValidation.errors.length == 0) {
            console.log(req.body)
         const biggestId = await Notes.max("id")
        await Notes.create({
            id : biggestId + 1,
            name : req.body.name,
            image: req.body.image,
            text : req.body.text,
            categoryId : Number(req.body.categoryId),
            userId : Number(req.session.userLogged.id),
            deleted : 0
        })
        res.redirect("/api/notes")   
        }

        if (resultValidation) {
            res.json({
            resultValidation
        })
        }
    },
    delete: async (req, res) => {

        const noteSearch = await Notes.findOne({ where: { id: req.params.id, deleted: false }})
        if (noteSearch) {
            await Notes.update({
                deleted: 1
            }, { where : {id : req.params.id} })
            res.redirect("/api/profile")
        } else {
            res.json({
                Problema : "No se encontro la nota"
            })
        }
    },
    edit: async (req, res) => {
        const noteSearch = await Notes.findOne({ where: { id : req.params.id }})
        
    if (noteSearch) {
        const noteEdited = await Notes.update({
            name : req.body.name ? req.body.name : noteSearch.name,
            image: req.body.image ? req.body.image : noteSearch.image,
            text : req.body.text ? req.body.text : noteSearch.text,
            categoryId: req.body.categoryId ? Number(req.body.categoryId) : noteSearch.categoryId,
        }, {
            where: { id : req.params.id}
            })
    } else {
        res.json({
            status: 404,
            Problema: "No se encontro la nota"
        })
    }
        


        res.redirect("/api/notes/" + req.params.id )
    },
    likes: async (req, res) => {
        const biggestId = await Note_user_fav.max("id")
        const noteLikes = await Notes.findOne({where: {id: req.body.notesId, deleted: false}})
        console.log(noteLikes)
        
        if (noteLikes) {
            await Note_user_fav.create({
            id: biggestId + 1,
            notesId: req.body.notesId,
            userId: req.session.userLogged.id
        })

        res.redirect("/api/profile")
        }

        if (!noteLikes) {
            res.json({
                message: "Nota no encontrada"
            })
        }
        
    },
    deleteLikes: async (req, res) => {
        const user = await Users.findOne({where: {id: req.session.userLogged.id}, include:["notes", "favnote"]})
        const favNote = await Note_user_fav.findOne({where: {userId: user.id , notesId: req.body.notesId}})
        if (favNote) {
            const note = await Notes.findOne({where: {id: favNote.notesId, deleted: false}})
            if (favNote && note) {
                await Note_user_fav.destroy({
                    where: {
                        id: favNote.id
                    }
                })
                res.redirect("/api/profile")
            }
        } else {
            res.json({message: "Este like no existe"})
            }
    }
}

module.exports = controller