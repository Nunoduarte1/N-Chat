import cors from "cors";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { randomUUID } from "crypto";

const app = express();

app.use(cors({origin:"http://localhost:5173"}));

app.get("/", (req,res) =>{
    res.json ({status:"ok"});
});

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {origin: "http://localhost:5173"},
});

const MAX_NAME = 20;
const MAX_MESSAGE = 500;

function makeMessage(type, username, text){
    return {
        id: randomUUID(),
        type,
        username,
        text,
        timeStamp: new Date().toISOString(),
    };
}

io.on("connection", (socket)=> {
    console.log ("Client Connected: ", socket.id);
    
    socket.on("user:join", (username) => {
        const name = String(username ?? "").trim().slice(0, MAX_NAME);
        if (!name || socket.data.username) return;

        socket.data.username = name;

        io.emit("message:new", makeMessage("system",null,'${name} joined the chat !'));
    });

    socket.on("message:send", (text)=>{
        const trimmed = String(text ?? "").trim().slice(0, MAX_MESSAGE);
        
        if (!username || !trimmed) return;

        io.emit("message:new", makeMessage("user",username,trimmed));
    });

    socket.on("disconnect", ()=>{
        console.log("Client Disconnected: ", socket.id);

        const { username } = socket.data;

        if (username){
            io.emit("message:new", makeMessage("system",null,'${username} left the chat'))
        }
    });
});

const port = process.env.port || 3000;

httpServer.listen(port, () => {
    console.log('Server running om http://localhost:${port}');
});