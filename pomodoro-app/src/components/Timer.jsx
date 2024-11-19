import {useEffect, useState} from 'react';

function TimerRings({phases, phaseOrder, phaseCount, timeLeft, timeString}) {
    const phaseIndex = phaseOrder[phaseCount];
    const duration = phases[phaseIndex].duration;

    const startDurations = [];
    const totalDuration = phaseOrder.reduce((acc, curr) => {
        startDurations.push(acc);
        return acc + phases[curr].duration;
    }, 0);

    

    const colorInner = phases[phaseIndex].color;

    const radiusOuter = 200;
    const radiusInner = 175;
    const strokeWidth = 20;
    const totalWidth = (radiusOuter + strokeWidth) * 2;
    const circumferenceOuter = 2 * Math.PI * radiusOuter;
    const circumferenceInner = 2 * Math.PI * radiusInner;
    const arcLengthInner = circumferenceInner * timeLeft / duration;
    const startingRotations = startDurations.map((duration) => circumferenceOuter * duration / totalDuration);
    console.log(circumferenceOuter);
    console.log(startingRotations);

    return (
        <svg height={totalWidth} width={totalWidth}>
            <circle
                fill='transparent'
                stroke='white'
                strokeWidth={strokeWidth}
                r={radiusOuter}
                cx={totalWidth / 2}
                cy={totalWidth / 2}
            />
            <circle
                fill='transparent'
                stroke='white'
                strokeWidth={strokeWidth}
                r={radiusInner}
                cx={totalWidth / 2}
                cy={totalWidth / 2}
            />
            {phaseOrder.map((phaseIndex, i) => {
                if (i < phaseCount) return;
                const arcLength = phases[phaseIndex].duration / totalDuration * circumferenceOuter;
                let currArcLength;
                if (i === phaseCount) {
                    currArcLength = arcLength * timeLeft / duration;
                }
                else {
                    currArcLength = arcLength;
                }

                const color = phases[phaseIndex].color;
                console.log(arcLength);
                return (
                    <circle
                        fill='transparent'
                        stroke={color}
                        strokeWidth={strokeWidth}
                        strokeDasharray={`${currArcLength} ${circumferenceOuter}`}
                        strokeDashoffset={-(circumferenceOuter - arcLength) + startingRotations[i]}
                        strokeLinecap='round'
                        r={radiusOuter}
                        cx={totalWidth / 2}
                        cy={totalWidth / 2}
                        style={{transition: 'stroke-dasharray 0.99s linear'}}
                        transform={`rotate(-90 ${totalWidth / 2} ${totalWidth / 2})`}
                    />
                );
            })}
            <circle
                fill="transparent"
                stroke={colorInner}
                strokeWidth={strokeWidth}
                strokeDasharray={`${arcLengthInner} ${circumferenceInner}`}
                strokeLinecap="round"
                r={radiusInner}
                cx={totalWidth / 2}
                cy={totalWidth / 2}
                style={{ transition: 'stroke-dasharray 0.99s linear, stroke 0.99s linear' }}
                transform={`rotate(-90 ${totalWidth / 2} ${totalWidth / 2})`}
            />
            <text
                x={totalWidth / 2}
                y={totalWidth / 2}
                textAnchor='middle'
                dominantBaseline='middle'
                fontSize='96px'
                fill='white'
            >
                {timeString}
            </text>
        </svg>
    )
}

function StartButton({onButtonClick, isRunning}) {
    const startStyles = 'bg-lime-200 text-lime-600 hover:bg-lime-600 hover:text-lime-200';
    const pauseStyles = 'bg-yellow-200 text-yellow-600 hover:bg-yellow-600 hover:text-yellow-200'
    return (
        <button class={`${isRunning ? pauseStyles : startStyles} w-24 h-24 text-2xl rounded-full`} onClick={onButtonClick}>{isRunning?"Pause": "Start"}</button>
    )
}


export default function Timer({phases, phaseOrder, phaseCount, updatePhaseCount}) {
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const phaseIndex = phaseOrder[phaseCount];

    const duration = phases[phaseIndex].duration;

    const timeLeft = duration - timeElapsed;

    const counter = () => setTimeElapsed(prevTime => prevTime + 1);
    const startStopTimer = () => setIsRunning(!isRunning);

    useEffect(() => {
        let timer;
        if (isRunning & timeLeft > 0) {
            timer = setTimeout(counter, 1000);
        }
        else if (timeLeft <= 0) {
            timer = setTimeout(() => {
                setIsRunning(false);
                updatePhaseCount();
                setTimeElapsed(0);
            }, 1000)
        }
        return (() => clearTimeout(timer));
    }, [isRunning, timeElapsed]);

    const hrs = String(Math.floor(timeLeft/3600)).padStart(2, "0");
    const mins = String(Math.floor((timeLeft%3600)/60)).padStart(2, "0");
    const secs = String(timeLeft%60).padStart(2, "0");
    const timeString = `${mins}:${secs}`;

    return (
        <div class="flex-col justify-items-center m-5">
            <TimerRings 
                phases={phases}
                phaseOrder={phaseOrder}
                phaseCount={phaseCount}
                timeLeft={timeLeft}
                timeString={timeString}
            />
            <StartButton onButtonClick={startStopTimer} isRunning={isRunning} />
        </div>
    );
}