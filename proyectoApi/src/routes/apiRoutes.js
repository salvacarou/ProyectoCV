const express = require("express");
const router = express.Router();

const userValidator = require('../middlewares/userValidator')
const notesValidator = require('../middlewares/notesValidator')
const loginValidator = require('../middlewares/loginValidator')
const checkLog = require("../middlewares/checkLogged")
const thatUser = require("../middlewares/especificUser")

const apiUsers = require("../controllers/apiUsers")
const apiNotes = require("../controllers/apiNotes")

router.get("/notes", apiNotes.list);
router.get("/deletedNotes", apiNotes.deletedNotes);
router.get("/notes/:id", apiNotes.detail);
router.post("/notes", checkLog.logged, notesValidator, apiNotes.create);
router.put("/notes/:id", thatUser.forNotes, apiNotes.edit);
router.delete("/notes/:id", thatUser.forNotes, apiNotes.delete);

router.get("/users", apiUsers.list);
router.get("/deletedUsers", apiUsers.deletedUsers);
router.get("/users/:id", apiUsers.detail);
router.post("/users", checkLog.notLogged, userValidator,  apiUsers.create); // register
router.put("/users/:id", thatUser.forUsers, apiUsers.edit);
router.delete("/users/:id", thatUser.forUsers, apiUsers.delete);

router.post("/login", loginValidator, apiUsers.login)
router.get("/logout", checkLog.logged, apiUsers.logout)

router.get("/profile", checkLog.logged, apiUsers.profile)

router.post("/likes", checkLog.logged, apiNotes.likes)
router.delete("/likes", checkLog.logged, apiNotes.deleteLikes)

router.get("/", (req, res) => {
   res.send("<br> <a href = http://localhost:3001/api/notes> Notas <a> <br><br> <a href = http://localhost:3001/api/users> Users <a>") 
} )


module.exports = router;