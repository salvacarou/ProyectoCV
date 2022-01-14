const { Users } = require("../database/models");


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
        const user = await Users.findByPk(req.params.id)
         
        if (user) {
            res.json({
             data: {
                 id: user.id,
                 fullName: user.fullName,
                 username: user.username,
                 email: user.email,
                 birthdate: user.birthdate,
                 image: "http://localhost:3001/public/images/users/" + user.image,
                 delted: user.deleted
             },
             meta: {
                 status: 200,
                 url: "http://localhost:3001/api/users/" + user.id
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

        const biggestId = await Users.max("id")
        const newUser = await Users.create({
            id : biggestId + 1,
            fullName : req.body.fullName ? req.body.fullName : "incompleto",
            username : req.body.username ? req.body.username : "incompleto",
            email : req.body.email ? req.body.email : "incompleto",
            birthdate: req.body.birthdate ? req.body.birthdate : "incompleto",
            image: req.body.image ? req.body.image : "incompleto",
            password: req.body.password ? req.body.password : "incompleto",
            deleted : 0
        })
        res.redirect("/api/users")
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