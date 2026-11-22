import { useEffect } from "react";
import { socket } from "./socket";

export default function App() {
  useEffect (() => {
    socket.on("connect", () => console.log("Connected", socket.id));
    socket.on("disconnect", () => console.log("Disconnected"));

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

++++++++++++++++++++++++++++++++++++++++++return <h1>N-Chat™</h1>
}