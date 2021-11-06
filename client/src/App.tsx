import { useEffect } from 'react';
import { io } from 'socket.io-client';
import './App.css';
import logo from './logo.svg';

function App() {
    useEffect(() => {
        const socket = io('http://localhost:4000');
        socket.on('connect', () => {
            console.log('connected');
        });
        socket.on('disconnect', () => {
            console.log('disconnected');
        });
    }, []);
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
            </header>
        </div>
    );
}

export default App;
