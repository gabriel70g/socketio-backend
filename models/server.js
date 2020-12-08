const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //http server
    this.server = http.createServer(this.app);

    // config sockets
    this.io = socketio(this.server, {
      /* configuraciones */
    });
  }

  middlewares() {
    //desplegar el directorio publico
    this.app.use(express.static(path.resolve(__dirname, "../public")));
  }

  configureSockets() {
    new Sockets(this.io);
  }

  execute() {
    // inicializar middleswares
    this.middlewares();

    // configurar sockets
    this.configureSockets();

    // inicializar server
    this.server.listen(this.port, () => {
      console.log("Server corriendo en puerto: 8081");
    });
  }
}

module.exports = Server;
