const express = require('express');
const app = express();
app.use(express.json());

/*
API SINTAX:
http://localhost:3000/api/TABLENAME/TAREA O ID/campo1/campo2/campo3/etc

EJEMPLO:
1- SELECCIONAR CLIENTES:
http://localhost:3000/api/clientes/2      ----->  obtienes cliente id 2
http://localhost:3000/api/clientes/*      ----->  obtienes todos los clientes
*/


app.get('/api', (req, res) =>{
    res.send(`
    Bienvenido al API de Clientes </br></br>
    EJEMPLO: </br>
    1- SELECCIONAR CLIENTES: </br>
    http://localhost:3000/api/clientes/2      ----->  obtienes cliente id 2 </br>
    http://localhost:3000/api/clientes/*      ----->  obtienes todos los clientes </br>
    `);
});

//obtener todos los clientes
app.get('/api/clientes/',async (req, res) => { 
    const getData = require('./api/getClientes')
    const data = await getData('*');
    if (data.length){
        res.status(200).send(data);
    }else{
        res.status(404).send("No hay clientes en la base de datos");
    }
    console.log("Peticion GET de clientes, por parte de ["+req.ip+"]");
});

//obtener cliente por id
app.get('/api/clientes/:id',async (req, res) => {
    const getData = require('./api/getClientes')
    const data = await getData(req.params.id);
    if (data.length){
        res.status(200).send(data);
    }else{
        res.status(404).send("Cliente no encontrado");
    }
    console.log("Peticion GET de clientes con el id " + req.params.id + ", por parte de ["+req.ip+"]");

});

//insertar cliente POST
app.post('/api/clientes/insertar',async (req,res) => {
    const insertData = require('./api/insertClientes');
    const result = await insertData(req.body);
    
    if(result == 1){
        res.status(200).send("Cliente insertado");
    }else if(result == 0){
        res.status(400).send("Ese nombre esta ocupado");
    }

    console.log("Peticion POST de clientes/insertar por parte de ["+req.ip+"]");

});

const port = process.env.PORT || 3000;
app.listen(port,() => {console.log(`Servidor corriendo en el puerto ${port} :)`)});