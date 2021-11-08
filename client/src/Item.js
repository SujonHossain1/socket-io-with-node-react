const Item = ({ item, updateStatusHandler }) => {
    return (
        <div className="col-md-3" >
            <div
                className="card mb-4 shadow border-0 h-100"
            >
                <img
                    className="card-img-top"
                    src={item.image}
                    alt={item.name}
                />
                <div className="card-body bg-dark">
                    <p className="card-text text-left text-white">
                        Name: {item.name} <br /> Seat Price: {item.price}{' '}
                        Tk
                    </p>
                    <div className="d-flex justify-content-center align-items-center">
                        <button
                            type="button"
                            onClick={() => updateStatusHandler(item)}
                            className={`btn btn-sm  ${item.status === 'available' && 'btn-success'
                                } ${item.status === 'processing' && 'btn-danger disabled'
                                } `}
                        >
                            {item.status === 'available' && 'Book Now'}
                            {item.status === 'processing' && 'Processing'}
                            {item.status === 'unavailable' && 'Unavailable'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Item