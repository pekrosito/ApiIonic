const app = require('./config/server');

require('./app/routes/products')(app);
require('./app/routes/sales')(app);
require('./app/routes/typeProduct')(app);
require('./app/routes/users')(app);

// starting the server
app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'));
});
