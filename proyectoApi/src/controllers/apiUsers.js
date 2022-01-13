const { db } = require("../database/models/index");


const controller = {
    list: async (req, res) => {
        // console.log()

        const usersList = await db.Users.findAll();
        
        const users = usersList.map((userr) => { 
            return { 
                id: userr.id,
                name: userr.fullName,
                email: userr.email,
                url: "http://localhost:3001/api/users/" + userr.id
             }
         })

        res.json({
            meta:{
                status: 200,
                count: users.length,
                url: "http://localhost:3000/api/users/",
            },
            data:{
                users
            }
        })
    }
}

module.exports = controller