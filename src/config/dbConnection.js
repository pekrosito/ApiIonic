const mysql = require('mysql');

module.exports = () => {
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'induccionIonic',
    port:'3306',
    multipleStatements: true
  });

connection.connect(function(error){
  if(error){
     throw error;
  }else{
     console.log('Conexion correcta.');
  }
});

return connection;
}