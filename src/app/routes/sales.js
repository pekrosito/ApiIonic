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
    connection.query('SELECT * FROM ventas V inner join producto P ON P.id_producto = V.id_producto', function(error, result){
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

  app.get('/getSalesProductByUser', (req, res) => {
    var id_usuario = req.param('id');
    let connection = dbConnection();
    connection.query('select sum(V.cantidad)  as cantidad_vendidos, P.cantidad, P.nombre, P.precio, P.id_producto, P.image FROM ventas V inner join producto P ON P.id_producto = V.id_producto  where V.id_usuario = '+ id_usuario + ' group by P.id_producto', function(error, result){
      connection.end(function(err){
        if(err){
          throw err;
       }else{
          var resultado = result;
          if(resultado != undefined && resultado.length > 0){
            res.send(resultado)
          }else{
            resultado.message = "Registro no encontrado";
            res.send(resultado)
          }
       }
      })
    });
  });

  app.post('/createSale', (req, res) => {
    const { id_venta, id_producto, id_usuario, cantidad } = req.body;
    let connection = dbConnection();
      
    connection.query('INSERT INTO ventas (id_ventas, id_producto, id_usuario, cantidad) VALUES (' + null +','+id_producto+','+id_usuario+','+cantidad+')', function (err, result){     
      connection.end(function(err){
        if(err){
          throw err;
       }else{
          res.send(result)
       }
      })
    })
  })
};
