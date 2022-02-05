const express = require("express");
const session = require('express-session');
const bodyParser = require("body-parser");

const app = express();
app.use(session({
    secret: "Mensaje Secreto",
    resave: false,
	saveUninitialized: false,
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

const rutaApi = require("./routes/apiRoutes")
app.use("/api", rutaApi)

app.use("/", (req, res) => {
    res.send("<br> <a href = http://localhost:3001/api> Api <a>") 
 } )

app.listen(3001, () => console.log("Servidor esta corriendo en el puerto 3001"));

module.export = app; 