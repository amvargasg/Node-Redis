const express = require('express');
const fs = require('fs');
//const conn = require('./conecction');
const conn = require('./sentinel');
//const convert = require('./convert');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

const app = express();
const port = 8000; 

app.post('/api/insertar_datos/:key', (req, res) => { 

   var key = req.params.key;
   
 // Use fs.readFile() method to read the file
 if (key == 'APIPersonasDetalleProductosObtenerPoductoAfiliado') {
   fs.readFile('input.xml', "utf8", (err, data) => { 
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
 }
 else if (key == 'SVR_APOLO') {
   fs.readFile('WMB_FW_CORE_ROUTING_MST.json',"utf8", (err, data) => {         
     //Delete previous values  
     conn.client.del(`${key}`);
     data2 = JSON.parse(data)
     //set new values
     conn.client.set(`${key}`, JSON.stringify(data2));
 
     return res.status(200).send({
     error: false,
     message: `Datos correctamente insertados en Redis`,
     //data2: data2
     });
     
 })
 }
 });



app.get('/api/obtener_datos', (req, res) =>{
 try {
    var key = req.query.key
    console.log(key)
    conn.client.get(`${key}`, async (err, data) => {
      if (data) {
         return res.status(200).send({
           error: false,
           data: JSON.parse(data)
           
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