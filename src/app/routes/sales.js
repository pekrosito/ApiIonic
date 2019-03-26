const dbConnection = require('../../config/dbConnection');

module.exports = app => {
  
app.get('/getSales', (req, res) => {
  let connection = dbConnection();
  connection.query('SELECT * FROM ventas', function(error, result){
    connection.end(function(err){
      if(err){
        throw err;
     }else{
        var resultado = result;
        if(resultado != undefined && resultado.length > 0){
            res.send(resultado)
          }else{
              res.send("Registro no encontrado")
          }
     }
    })
  });
});

app.get('/getSalesUser', (req, res) => {
    let connection = dbConnection();
    connection.query('SELECT * FROM ventas V inner join usuario U ON U.id_usuario = V.id_usuario', function(error, result){
      connection.end(function(err){
        if(err){
          throw err;
       }else{
          var resultado = result;
          if(resultado != undefined && resultado.length > 0){
            res.send(resultado)
          }else{
              res.send("Registro no encontrado")
          }
       }
      })
    });
  });

  app.get('/getSalesProduct', (req, res) => {
    let connection = dbConnection();
    connection.query('SELECT * FROM ventas V inner join product P ON P.id_producto = V.id_producto', function(error, result){
      connection.end(function(err){
        if(err){
          throw err;
       }else{
          var resultado = result;
          if(resultado != undefined && resultado.length > 0){
            res.send(resultado)
          }else{
              res.send("Registro no encontrado")
          }
       }
      })
    });
  });

  app.get('/getSalesProductUser', (req, res) => {
    let connection = dbConnection();
    connection.query('SELECT * FROM ventas V inner join product P ON P.id_producto = V.id_producto inner join usuario U ON U.id_usuario = V.id_usuario', function(error, result){
      connection.end(function(err){
        if(err){
          throw err;
       }else{
          var resultado = result;
          if(resultado != undefined && resultado.length > 0){
            res.send(resultado)
          }else{
              res.send("Registro no encontrado")
          }
       }
      })
    });
  });

  app.post('/createSale', (req, res) => {
    console.log(req.body)
    const { id_ventas, id_producto, id_usuario, cantidad } = req.body;
    let connection = dbConnection();
      
    connection.query('INSERT INTO ventas (id_ventas, id_producto, id_usuario, cantidad) VALUES (' + null +','+id_producto+','+id_usuario+','+cantidad+')', function (err, result){     
      connection.end(function(err){
        if(err){
          throw err;
       }else{
         result.message = "Actualizado"
          res.send(result)
       }
      })
    })
  })
};
