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

// const publicPath = path.resolve(__dirname, "../public");
// app.use(express.static(publicPath));

// Implementando EJS 
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "./views"));

// Rutas 
const rutaApi = require("./routes/apiRoutes")
app.use("/api", rutaApi)

app.listen(3001, () => console.log("Servidor esta corriendo en el puerto 3001"));

module.export = app; 