const dbConnection = require('../../config/dbConnection');

module.exports = app => {
  
app.get('/getUsers', (req, res) => {
  let connection = dbConnection();
  connection.query('SELECT * FROM usuarios', function(error, result){
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
};