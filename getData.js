const express = require('express');
const fs = require('fs');
const conn = require('./conecction');
//const conn = require('./sentinel');
var xml2js = require('xml2js');
var json2xml = require('json2xml');
var parser = new xml2js.Parser();

const app = express();
const port = 8080; 

app.post('/proteccion/:key', (req, res) => { 

   var key = req.params.key;
   
// Use fs.readFile() method to read the file
 if (key == 'ConsultaEstadoAfiliadoEmpleador') {
  file = 'linea_negocio4.xml';
 }
 if (key == 'APIPersonasDetalleProductosObtenerPoductoAfiliado') {
  file = 'input.xml';
}

  fs.readFile(file, "utf8", (err, data) => { 
    xml2js.parseString(data, (err, result) => {
       if(err) {
           throw err;
         }
       
       //Delete previous values  
       conn.client.del(`${key}`);
 
       //set new values
       conn.client.set(`${key}`, JSON.stringify(result));
 
       return res.status(200).send({
         error: false,
         message: `Datos correctamente insertados en Redis`,
         //data: result
       }); 
    });
 });
});

 app.get('/proteccion', (req, res) =>{
  try {
     var key = req.query.key
     console.log(key)
     conn.client.get(`${key}`, async (err, data) => {
       if (data) {
          return res.status(200).send({
          //error: false,
            data: JSON.parse(data)
           //return res.status(200).send(json2xml(JSON.parse(data)))
          })
        
        } else {
          return res.status(401).send({
             error: true,
             message: `No hay llaves con ese nombre para el XML`,
                    });
        }
       });
 
    } catch (error) {
       console.log(error)
   }
 });
 
 // I want to handle every request that reach it this line
 app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
 });
 
 app.listen(port, () => console.log(`Server listening on port ${port}`));