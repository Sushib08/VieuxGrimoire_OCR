require("dotenv").config();
const http = require("http");
const app = require("./app");

const port = process.env.PORT;
app.set("port", port);

const errorHandler = (error) => {
  if (error.syscall !== "listen") throw error;
  // vérifier spécifiquement si l'erreur est liée à l'appel système de type "listen"

  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;

  switch (error.code) {
    case "EACCES":
    case "EADDRINUSE":
      console.error(bind + " " + error.message);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

server.listen(port);
