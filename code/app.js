const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001

const rutaMain = require("./routers/main.js");

app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/", rutaMain);

app.use(express.static("./public"));

app.listen(PORT, () => 
    console.log("Aplicación de Amigo Secreto LD está activa")
);