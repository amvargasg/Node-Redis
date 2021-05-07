const express = require('express');
const conn = require('./conecction');
//const conn = require('./sentinel');
const convert = require('./convert');

const app = express();
const port = 8000;


app.get('/proteccion', (req, res) =>{
 try {
    var service = req.query.service
    var operation = req.query.operation
      
    console.log("Service :", service)
    console.log("Operation :", operation)

    var key = `${service}` + `${operation}`
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
            message: `No hay llaves con ese nombre`,
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
