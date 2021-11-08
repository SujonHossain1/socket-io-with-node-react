import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:4000');
const id = nanoid(4)

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('chat', { message, id });
    setMessage("");
  }

  useEffect(() => {
    socket.on('chat', (data) => {
      setChat(chat => [...chat, data]);
    });
  })

  return (
    <div className="App">
      <header className="App-header">
        <ul>
          {chat.map((item) => <li key={item.id}>
            {item.message}
          </li>)}
        </ul>
        <form onSubmit={handleSubmit}>
          <input type="text" name="text" value={message} onChange={(event) => setMessage(event.target.value)} />
          <button type="submit">Send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
