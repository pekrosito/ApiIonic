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

app.get('/getProductByProductId', (req, res) => {
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
    const { id_producto, nombre, precio, cantidad, habilitado, image } = req.body;
   let connection = dbConnection();
   connection.query('INSERT INTO producto (id_producto, nombre, precio, cantidad, id_tipo_producto, habilitado, image) VALUES (' + null +','+'"'+nombre+'"'+','+precio+','+cantidad+','+1+','+habilitado+','+'"'+image+'"'+')',
   (err, result) => {
    console.log("Result Insert",err) 
    res.send(result);     
  });
});

  app.put('/updateProduct', (req,res) => {
    var id_producto = req.param('id');
    let connection = dbConnection();
    const { cantidad, nombre, precio, habilitado, image } = req.body;
    connection.query('UPDATE producto SET cantidad = '+cantidad+', nombre ='+ "'" + nombre +"'" +', precio = '+ precio +', habilitado = '+ habilitado +', image = '+ "'" + image+ "'" +' where id_producto ='+ id_producto , function(error, result){
      connection.end(function(err){
        if(err){
          throw err;
      }else{
          res.send(result);
      }
    })
    });
  })

  app.put('/updateProductSale', (req,res) => {
    var id_producto = req.param('id');
    const { cantidad } = req.body;
    let connection = dbConnection();
    connection.query('UPDATE producto SET cantidad = '+cantidad+' where id_producto ='+ id_producto , function(error, result){
      connection.end(function(err){
        if(err){
          throw err;
      }else{
          res.send(result);
      }
    })
    });
  })

  app.put('/updateStateProductById', (req, res) => {
    var productId = req.param('id');
    let state = req.body.habilitado;
    let connection = dbConnection();
    connection.query('Update producto set habilitado = '+state+' where id_producto = '+ productId, function(error, result){
      connection.end(function(err){
        if(err){
          throw err;
       }else{
          res.send(result);
       }
      })
    });
  });

};
