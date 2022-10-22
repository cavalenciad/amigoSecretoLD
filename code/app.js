const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001

const rutaMain = require("./routers/main.js");
const rutaGroups = require("./routers/groups.js");

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: false}));

app.use("/", rutaMain);
app.use("/", rutaGroups);

app.use(express.static("./public"));

app.listen(PORT, () => 
    console.log("Aplicación de Amigo Secreto LD está activa")
);