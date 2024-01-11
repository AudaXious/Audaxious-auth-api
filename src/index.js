import expressApp from "./app.js";
import { connectToDatabase } from "./database/index.js";
import { initSocket } from "./socket.js";

const port = process.env.PORT || 5000;

const startServer = (app, port) => {
  const server = app.listen(port, async () => {
    // connect to database....
    await connectToDatabase();
    console.log(`App is live an listening on port ${port}`);
  });
  initSocket(server);
};

startServer(expressApp, port);
