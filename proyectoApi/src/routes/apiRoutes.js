const express = require("express");
const router = express.Router();

const apiUsers = require("../controllers/apiUsers")
// const apiNotes = require("../controllers/apiNotes")

// router.get("/notes", apiNotes.list);
// router.get("/notes/:id", apiNotes.detail);

router.get("/users", apiUsers.list);
// router.get("/users/:id", apiUsers.detail);


module.exports = router;