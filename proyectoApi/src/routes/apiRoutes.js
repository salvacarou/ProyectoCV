const express = require("express");
const router = express.Router();

const userValidator = require('../middlewares/userValidator')
const notesValidator = require('../middlewares/notesValidator')

const apiUsers = require("../controllers/apiUsers")
const apiNotes = require("../controllers/apiNotes")

router.get("/notes", apiNotes.list);
router.get("/deletedNotes", apiNotes.deletedNotes);
router.get("/notes/:id", apiNotes.detail);
router.post("/notes", notesValidator, apiNotes.create);
router.put("/notes/:id", apiNotes.edit);
router.delete("/notes/:id", apiNotes.delete);

router.get("/users", apiUsers.list);
router.get("/deletedUsers", apiUsers.deletedUsers);
router.get("/users/:id", apiUsers.detail);
router.post("/users", userValidator,  apiUsers.create);
router.put("/users/:id", apiUsers.edit);
router.delete("/users/:id", apiUsers.delete);

router.get("/", (req, res) => {
   res.send("<br> <a href = http://localhost:3001/api/notes> Notas <a> <br><br> <a href = http://localhost:3001/api/users> Users <a>") 
} )


module.exports = router;