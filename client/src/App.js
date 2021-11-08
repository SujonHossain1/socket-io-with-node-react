import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const App = () => {
    const [state, setState] = useState({ message: "" })
    const [chat, setChat] = useState([]);
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io("http://localhost:4000");

        socketRef.current.on("message", ({ message }) => {
            setChat([...chat, { message }])
        })

        return () => socketRef.current.disconnect()
    }, [chat]);

    const onMessageSubmit = (e) => {
        const { message } = state
        socketRef.current.emit("message", { message })
        e.preventDefault()
        setState({ message: "" })
    }

    return (
        <div>
            <form onSubmit={onMessageSubmit}>
                <h1>Messenger</h1>
                <input
                    name="message"
                    onChange={(e) => setState({ ...state, message: e.target.value })}
                    value={state.message}
                    label="Message"
                />
                <button type="submit">Send Message</button>

            </form>
            <div className="render-chat">
                <h4>Chat Log</h4>
                {chat.map(({ message }, index) => (
                    <div key={index}>
                        <h3> {message} </h3>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default App