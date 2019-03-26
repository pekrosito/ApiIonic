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
    const { id_producto, nombre, precio, cantidad, id_tipo_producto, oferta } = req.body;
    var image = req.body.image;
   let connection = dbConnection();
   connection.query('INSERT INTO producto (id_producto, nombre, precio, cantidad, id_tipo_producto, oferta, image) VALUES (' + null +','+'"'+nombre+'"'+','+precio+','+cantidad+','+id_tipo_producto+','+oferta+','+'"'+image+'"'+')',
   (err, result) => {
    console.log("Result Insert",err) 
    res.send(result);     
  });
});

  app.put('/updateProduct', (req,res) => {
    let connection = dbConnection();
    const { id_producto, cantidad } = req.body;
    connection.query('UPDATE producto SET cantidad = '+cantidad+' where id_producto ='+ id_producto),
    (err, result) =>{     
      console.log("Producto",result)
      res.send(result);
    }
    
  })

};
