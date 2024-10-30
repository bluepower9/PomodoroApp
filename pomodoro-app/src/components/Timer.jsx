import {useEffect, useState} from 'react';

function StartButton({onButtonClick, isRunning}) {
    return (
        <button class="bg-gray-700 w-24 px-2 pb-1 text-2xl text-gray-300 rounded-xl shadow-md shadow-black hover:bg-gray-800 hover:shadow-lg hover:shadow-black" onClick={onButtonClick}>{isRunning?"Pause": "Start"}</button>
    )
}


function TimeComponent({val}){
    return (
        <div>
            <div class="flex justify-center bg-gray-800 rounded-lg px-2 pb-2">{val}</div>
        </div>
    )
}


function TimerOutput({time}){
    //const hrs = String(Math.floor(time/3600)).padStart(2, "0");
    const mins = String(Math.floor((time%3600)/60)).padStart(2, "0");
    const secs = String(time%60).padStart(2, "0");

    return (
        <div class="flex bg-black py-3 px-4 mb-4 rounded-2xl shadow-lg shadow-black text-white text-8xl space-x-2">
            <div class="flex-col">
                <TimeComponent val={mins}/>
                <h1 class="flex justify-center text-gray-400 text-lg mt-1 font-bold">min</h1>
            </div>
            <p>:</p>
            <div class="flex-col">
                <TimeComponent val={secs}/>
                <h1 class="flex text-gray-400 justify-center text-lg mt-1 font-bold">sec</h1>
            </div>
        </div>
    );
}


export default function Timer({timeLength, updatePhase}) {
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const timeLeft = timeLength - timeElapsed;

    useEffect(() => {
        let timer;
        if (isRunning & timeLeft > 0) {
            timer = setTimeout(counter, 1000);
        }
        else if (timeLeft <= 0) {
            setIsRunning(false);
            updatePhase();
            setTimeElapsed(0);
        }
        return (() => clearTimeout(timer));
    }, [isRunning, timeElapsed]);

    const hrs = String(Math.floor(timeLeft/3600)).padStart(2, "0");
    const mins = String(Math.floor((timeLeft%3600)/60)).padStart(2, "0");
    const secs = String(timeLeft%60).padStart(2, "0");

    const counter = () => setTimeElapsed(prevTime => prevTime + 1);
    const startStopTimer = () => setIsRunning(!isRunning);

    return (
        <div class="flex-col justify-items-center m-5">
            <TimerOutput time={timeLeft}/>
            <StartButton onButtonClick={startStopTimer} isRunning={isRunning}/>
        </div>
    );
}