import React, { useState} from 'react';

export default function Header(props) {
    const [counter, setCounter] = useState(0);

    function increment(){
        setCounter(counter + 1);
    };

    return (
        <header>
            <h1>{props.title}</h1>
            
            <h2>Contador: {counter}</h2>
            <button onClick={increment}>Incrementar</button>

        </header>
    );
};