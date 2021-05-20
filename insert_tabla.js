const express = require('express');
const fs = require('fs');

const port = 3001;
const app = express();
//const conn = require('./conecction');
const conn = require('./sentinel');

app.get('/proteccion/insertar_tabla/:key', (req, res) => { 
    const key_tabla = req.params.key_tabla;

    fs.readFile('WMB_FW_CORE_ROUTING_MST.json', "utf8", (err, data) => {         
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

app.listen(port, () => console.log(`Server listening on port ${port}`));

module.exports = app;