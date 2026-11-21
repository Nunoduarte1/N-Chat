import cors from "cors";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();

app.use(cors({origin:"http://localhost:5173"}));

app.get("/", (req,res) =>{
    res.json ({status:"ok"});
});

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {origin: "http://localhost:5173"},
});

io.on("connection", (socket)=> {
    console.log ("Client Connected: ", socket.id);
    
    socket.on("disconnect", ()=>{
        console.log("Client Disconnected: ", socket.id);
    });
});

const port = process.env.port || 3000;

httpServer.listen(port, () => {
    console.log('Server running om http://localhost:${port}');
});