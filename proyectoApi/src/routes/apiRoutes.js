const express = require("express");
const router = express.Router();

const apiUsers = require("../controllers/apiUsers")
const apiNotes = require("../controllers/apiNotes")

router.get("/notes", apiNotes.list);
// router.get("/notes/:id", apiNotes.detail);

router.get("/users", apiUsers.list);
router.get("/users/:id", apiUsers.detail);
router.post("/users", apiUsers.create);
router.put("/users/:id", apiUsers.edit);
router.delete("/users/:id", apiUsers.delete);


module.exports = router;