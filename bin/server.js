const app = require('../src/app');
const port = normalizePort( process.env.PORT || '8082' );
app.set('port', port );

app.listen(port, function(){
  console.log("servidor rodando", port)
});

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
