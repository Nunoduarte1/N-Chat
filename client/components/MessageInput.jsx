import { useState } from "react";

export default function MessageInput ({ onSend }){
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmed = text.trim();
        if(!trimmed) return;
        onSend(trimmed);
        setText("");
    };

    return(
        <form onSubmit={handleSubmit} className="input-bar">
            <input autoFocus maxLength={500} placeholder="Insere aqui a mensagem!" value={text} onChange={(e)=>setText(e.target.value)}/>
            <button type="submit" disabled={!text.trim()}>
                Send Message
            </button>
        </form>
    );
}