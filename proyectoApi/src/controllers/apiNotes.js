const { all } = require("express/lib/application");
const { Notes } = require("../database/models");


const controller = {
    list: async (req, res) => {
        const notesList = await Notes.findAll({where : {deleted : 0}})
        console.log(notesList)
        const allNotes = notesList.map((notes) => {
            return {
                id: notes.id,
                name: notes.name,
                deleted: notes.deleted,
                url: "http://localhost:3001/api/notes/" + notes.id
            }
        })

        res.json({
            meta: {
                status: 200,
                count: allNotes.length,
                url: "http://localhost:3001/api/notes"
            },
            data: allNotes
        })
    }
}

module.exports = controller