import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import Item from './Item';

const App = () => {
    const [state, setState] = useState({ message: "" })
    const [chat, setChat] = useState([]);
    const [launch, setLaunch] = useState([]);
    const socketRef = useRef();


    useEffect(() => {
        socketRef.current = io("http://localhost:4000");

        socketRef.current.on("message2", ({ message }) => {
            setChat([...chat, { message }])
        })

        /*** launch item real update */
        socketRef.current.on("message", ({ launches }) => {
            console.log("message", launches);
            setLaunch(launches);
        })
        /** Get all launch */
        socketRef.current.on("launch", ({ launch }) => {
            setLaunch(launch)
        });

        /*** after update status */
        socketRef.current.on("updatedLaunch", (data) => {
            console.log(data)
        })

        return () => socketRef.current.disconnect()
    }, [chat]);

    const onMessageSubmit = (e) => {
        e.preventDefault()
        const { message } = state
        socketRef.current.emit("message2", { message })

        setState({ message: "" })
    }

    const updateStatusHandler = (launchItem) => {
        socketRef.current.emit("message", { message: launchItem })
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
            <h3 className="text-center py-4 border-bottom">item list</h3>
            <div className="container">
                <div className="row">
                    {launch.map((item) => (
                        <Item key={item._id} item={item} updateStatusHandler={updateStatusHandler} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default App