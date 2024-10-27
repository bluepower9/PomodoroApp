import {useEffect, useState} from 'react';

function StartButton({ onButtonClick }) {
    return (
        <button onClick={onButtonClick}>Start</button>
    )
}

export default function Timer() {
    const [timeLeft, setTimeLeft] = useState(5);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let timer;
        if (isRunning & timeLeft > 0) {
            timer = setTimeout(counter, 1000);
        }
        else if (timeLeft <= 0) {
            setIsRunning(false);
        }
        console.log(timer);
        return (() => clearInterval(timer));
    }, [isRunning, timeLeft]);

    function counter() {
        setTimeLeft(prevTime => prevTime - 1);
    }

    function onButtonClick() {
        setTimeLeft(5);
        setIsRunning(true);
    }

    return (
        <div class="flex flex-col justify-center items-center">
            <div class="flex justify-center bg-black w-40 rounded-2xl">
                <h1 class="text-white text-8xl">{timeLeft}</h1>
            </div>
            <StartButton onButtonClick={onButtonClick}/>
        </div>
    );
}