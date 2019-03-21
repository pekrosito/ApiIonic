const dbConnection = require('../../config/dbConnection');

module.exports = app => {
  
app.get('/getProducts', (req, res) => {
  let connection = dbConnection();
  connection.query('SELECT * FROM producto P inner join tipo_producto TP ON TP.id_tipo_producto = P.id_tipo_producto', function(error, result){
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

app.get('/getProductsByProductId', (req, res) => {
  var productId = req.param('id');
  let connection = dbConnection();
  connection.query('SELECT * FROM producto P inner join tipo_producto TP ON TP.id_tipo_producto = P.id_tipo_producto where id_producto = ' + productId, function(error, result){
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
  
  app.post('/createProduct', (req, res) => {
    //const { id_producto, nombre } = req.body;
   console.log(req.body)
   let connection = dbConnection();
   connection.end(function(err){
    connection.query('INSERT INTO producto SET ? ',
      {
        id_producto,
        nombre,
        precio,
        cantidad,
        id_tipo_producto,
        oferta
      }, (err, result) => {
      res.redirect('/news');
    });
  })
});

};
