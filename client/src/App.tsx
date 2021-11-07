import { useEffect, useState } from 'react';
import './App.css';
import ProductItem from './components/ProductItem/ProductItem';
import { IProduct } from './types';

function App() {
    const [data, setData] = useState<IProduct[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch('http://localhost:4000/api/launch')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setData(data.data);
            })
            .catch((err) => console.error(err));
    };
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
            </header>
        </div>
    );
}

export default App;
