const express = require('express');
const fs = require('fs');
const xml2js = require('xml2js');

const port = 8000;
const app = express();
const conn = require('./conecction');
//const conn = require('./sentinel');

app.get('/proteccion/insertar_datos/:key', (req, res) => { 

  const key = req.params.key;

// Use fs.readFile() method to read the file
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
          data: result
        });
        
      })
});
});


app.listen(port, () => console.log(`Server listening on port ${port}`));

module.exports = app;


