import { useState } from 'react';
import { io } from 'socket.io-client';
import { IProduct } from '../../types';

interface IProps {
    product: IProduct;
}

const ProductItem = ({ product }: IProps) => {
    const [level, setLevel] = useState(product.status);

    const bookingHandler = (product: IProduct) => {
        const socket = io('http://localhost:4000');
        socket.emit('processing', product);

        socket.on('processResponse', (data) => {
            console.log(data, 'response data');
            setLevel(data.data.status);
        });
    };

    return (
        <div className="col-md-3">
            <div
                className="card mb-4 shadow border-0 h-100"
                title={
                    level === 'processing'
                        ? 'Sujon Hossain are processing this ticket'
                        : ''
                }
            >
                <img
                    className="card-img-top"
                    src={product.image}
                    alt={product.name}
                />
                <div className="card-body bg-dark">
                    <p className="card-text text-left text-white">
                        Name: {product.name} <br /> Seat Price: {product.price}{' '}
                        Tk
                    </p>
                    <div className="d-flex justify-content-center align-items-center">
                        <button
                            type="button"
                            className={`btn btn-sm  ${
                                level === 'available' && 'btn-success'
                            } ${
                                level === 'processing' && 'btn-danger disabled'
                            } `}
                            onClick={() => bookingHandler(product)}
                        >
                            {level === 'available' && 'Book Now'}
                            {level === 'processing' && 'Processing'}
                            {level === 'unavailable' && 'Unavailable'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
