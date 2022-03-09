const { Notes } = require("../database/models");
const { Users } = require("../database/models");

module.exports = {
   forNotes: async function userForNotes(req, res, next) {
    if (req.session.userLogged) {
        const noteSearch = await Notes.findOne({ where: { id : req.params.id }})
        if (noteSearch.userId == req.session.userLogged.id) {
           next() 
        } if (noteSearch.userId != req.session.userLogged.id) {
          res.json({
            status: 401,
            message: "No estas autorizado"
        })  
        }
} else {
    res.json({
      status: 401,
      message: "No estas logueado"
  })  
  }
},

forUsers : async function userForUsers(req, res, next) {


    if (req.session.userLogged) {
        const userSearch = await Users.findOne({ where: { id : req.params.id }})
        if (userSearch.id == req.session.userLogged.id) {
           next() 
        } if (userSearch.id != req.session.userLogged.id) {
          res.json({
            status: 401,
            message: "No estas autorizado"
        })  
        }
} else {
    res.json({
      status: 401,
      message: "No estas logueado"
  })  
  }
} 
}


