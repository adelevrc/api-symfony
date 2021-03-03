import React, {useState} from 'react'; 


const Counter = () => {
    const [count, setCount] = useState(0);

    return(
        <div>
            <div className="container-count">
                <button className="button-counter" onClick={() => setCount(count - 1)}>
                    -
                </button>

                <p className="count-input">{count}</p>

                <button className="button-counter" onClick={() => setCount(count + 1)}>
                    +
                </button>
            </div>
        </div>
    )
}

export default Counter; 