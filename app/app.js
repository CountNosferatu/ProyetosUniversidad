const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient, ServerApiVersion } = require ('mongodb');

const app = express();

const uri = "mongodb+srv://furrygay69:furrygay69@cluster0.90jlnvl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Middleware para parsear el cuerpo de las solicitudes POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.static('public'))

// Crear un cliente de MongoDB
const client = new MongoClient(uri);

mongoose
    .connect(uri)
    .then(() => {
        console.log("Connected to the DB");
    })
    .catch((e)=>{
        console.log("Error: ", e);
    })

/*// Conectar a MongoDB
async function connectToMongo() {
  try {
    await client.connect();
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error(error);
  }
}

// Ruta para servir el formulario HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
*/
// Ruta para manejar los datos del formulario
app.post("/add", async (req, res) => {
  try {
    console.log(req.body); // Verifica los datos recibidos
    const { name, lastname, email, pnumber, password } = req.body;

    const data = {
        "name": name ,
        "lastname": lastname,
        "email": email,
        "pnumber" : pnumber,
        "password": password 
    };
    await client.db("maindb").collection("Users").insertOne(data);
    res.send("Registro agregado exitosamente");
    console.log("Registro agregado exitosamente");
    return res.status(200).redirect("/index.html");
  } catch (error) {
    console.error(error);
    res.send("Error al agregar el registro");
  }
});

// Iniciar el servidor
app.listen(4000, () => {
  //connectToMongo();
  console.log("Servidor iniciado en el puerto 4000");
});

app.get("/", (req, res) => {
  res.set({
      "Allow-access-Allow-Origin": '*'
  });
  //return res.status(200).redirect("index.html");
  res.redirect("/index.html");
});

