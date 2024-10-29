import {useEffect, useState} from 'react';

function StartButton({onButtonClick, isRunning}) {
    return (
        <button class="bg-gray-700 w-24 px-2 pb-1 text-2xl text-gray-300 rounded-xl shadow-md shadow-black hover:bg-gray-800 hover:shadow-lg hover:shadow-black" onClick={onButtonClick}>{isRunning?"Pause": "Start"}</button>
    )
}

export default function Timer(props) {
    const [timeLeft, setTimeLeft] = useState(props.time?props.time:60);
    const [isRunning, setIsRunning] = useState(false);

    // let hours, 

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

    const hrs = String(Math.floor(timeLeft/3600)).padStart(2, "0");
    const mins = String(Math.floor((timeLeft%3600)/60)).padStart(2, "0");
    const secs = String(timeLeft%60).padStart(2, "0");

    const counter = () => setTimeLeft(prevTime => prevTime - 1);
    const startStopTimer = () => setIsRunning(!isRunning);

    return (
        <div class="flex-col justify-items-center m-3">
            <div class="flex bg-black pb-2 px-3 mb-4 rounded-2xl shadow-lg shadow-black text-white text-8xl">
                <div>{hrs}:</div>
                <div>{mins}:</div>
                <div>{secs}</div>
            </div>
            <StartButton onButtonClick={startStopTimer} isRunning={isRunning}/>
            
        </div>
    );
}