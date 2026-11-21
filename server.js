// Add the Node.js HTTP module
import { createServer } from "node:http";

// Specify the hostname and port to run the server
const hostname = "localhost";
const port = 3000;

// Create a new Server instance with a requestListener callback
const server = createServer((req, res) => {
  res.statusCode = 200; // Set an OK success (200) response status code
  res.setHeader("Content-Type", "text/plain"); // Define the media type of the response data
  res.end("Hello World!"); // Specify the response data and close the response stream
});

// Run the server on the specified port and hostname
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:
${port}/`);
});