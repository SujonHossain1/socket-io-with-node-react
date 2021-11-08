import { SyntheticEvent, useState } from 'react';
import { io } from 'socket.io-client';
import './App.css';
import ProductItem from './components/ProductItem/ProductItem';
import { IProduct } from './types';

function App() {
    const socket = io('http://localhost:4000');
    const [data] = useState<IProduct[]>([]);
    const [msg, setMsg] = useState('');

    const [msgList, setMsgList] = useState(['']);

    const sendHandler = (event: SyntheticEvent) => {
        event.preventDefault();
        socket.emit('msg', msg);
    };

    socket.on('reply', (reply) => {
        console.log(reply);
        setMsgList((prev) => [...prev, reply]);
    });

    return (
        <div className="App">
            <header className="App-header">
                <div className="container pt-5">
                    <div className="row">
                        {data.map((product) => (
                            <ProductItem product={product} key={product._id} />
                        ))}
                    </div>
                </div>
                <div className="col-md-8 mx-auto">
                    <form className="d-flex" onSubmit={sendHandler}>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(event) => setMsg(event.target.value)}
                        />
                        <button className="btn btn-primary" type="submit">
                            Send
                        </button>
                    </form>
                </div>
                <div className="col-md-8 mx-auto">
                    <ul className="list-group mt-3">
                        {msgList.map((msg) => (
                            <li className="list-group-item" key={msg}>
                                {msg}
                            </li>
                        ))}
                    </ul>
                </div>
            </header>
        </div>
    );
}

export default App;
