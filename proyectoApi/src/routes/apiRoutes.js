const express = require("express");
const router = express.Router();

const apiUsers = require("../controllers/apiUsers")
const apiNotes = require("../controllers/apiNotes")

router.get("/notes", apiNotes.list);
router.get("/deletedNotes", apiNotes.deletedNotes);
router.get("/notes/:id", apiNotes.detail);
router.post("/notes", apiNotes.create);
router.put("/notes/:id", apiNotes.edit);
router.delete("/notes/:id", apiNotes.delete);

router.get("/users", apiUsers.list);
router.get("/deletedUsers", apiUsers.deletedUsers);
router.get("/users/:id", apiUsers.detail);
router.post("/users", apiUsers.create);
router.put("/users/:id", apiUsers.edit);
router.delete("/users/:id", apiUsers.delete);


module.exports = router;