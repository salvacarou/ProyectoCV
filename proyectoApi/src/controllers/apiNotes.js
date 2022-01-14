const { all } = require("express/lib/application");
const { Notes } = require("../database/models");


const controller = {
    list: async (req, res) => {
        const notesList = await Notes.findAll({where : {deleted : false}}, {include:["users"]})
        const allNotes = notesList.map((notes) => {     
                return {
                id: notes.id,
                name: notes.name,
                url: "http://localhost:3001/api/notes/" + notes.id,
            }    
        })

        res.json({
            meta: {
                status: 200,
                count: allNotes.length,
                url: "http://localhost:3001/api/notes",
                notasEliminadas: "http://localhost:3001/api/deletedNotes"
            },
            data: allNotes
        })
    },
    deletedNotes: async (req, res) => {
        const notesList = await Notes.findAll({where : {deleted : true}})
        console.log(notesList)
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
        const note = await Notes.findByPk(req.params.id, {include: ["category", "users"]}) 

        if (note) {
            res.json({
                data: {
                    id : note.id,
                    name : note.name,
                    category: note.category.name,
                    text: note.text,
                    image: note.image,
                    deleted: note.deleted[0] == 0 ? false : true,
                    userName: note.users.fullName,
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
                Problema: "No se encontro la nota",
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
        console.log(req.body)

        const biggestId = await Notes.max("id")
        const newNote = await Notes.create({
            id : biggestId + 1,
            name : req.body.name ? req.body.name : "incompleto",
            image: req.body.image ? req.body.image : "incompleto",
            text : req.body.text ? req.body.text : "incompleto",
            categoryId : Number(req.body.category ? req.body.category : 11),
            userId : Number(req.body.userId ? req.body.userId : 1),
            deleted : 0
        })

        console.log("llegoooooooooooooooo")
        res.redirect("/api/notes")
    },
    delete: async (req, res) => {

        const noteSearch = await Notes.findOne({ where: { id : req.params.id }})
        if (noteSearch) {
            await Notes.update({
                deleted: 1
            }, { where : {id : req.params.id} })
        } else {
            res.json({
                Problema : "No se encontro la nota"
            })
        }

        res.redirect("/api/notes")
    },
    edit: async (req, res) => {
        const noteSearch = await Notes.findOne({ where: { id : req.params.id }})
        const biggestId = await Notes.max("id")
        console.log(req.body)
        
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
    }
}

module.exports = controller