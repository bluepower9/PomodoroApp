import {useEffect, useState} from 'react';
import RoundButton from './ui/RoundButton';

function TimerRings({phaseCycle, phaseCount, phaseIndex, timeLeft}) {

    const phase = phaseCycle[phaseIndex]
    
    const hrs = String(Math.floor(timeLeft/3600)).padStart(2, "0");
    const mins = String(Math.floor((timeLeft%3600)/60)).padStart(2, "0");
    const secs = String(timeLeft%60).padStart(2, "0");
    const timeString = `${mins}:${secs}`;

    const durationInSeconds = phaseCycle[phaseIndex].duration * 60;

    const startTimes = [];
    const totalDuration = phaseCycle.reduce((acc, curr) => {
        startTimes.push(acc);
        return acc + curr.duration;
    }, 0);

    const colorInner = phaseCycle[phaseIndex].color;

    const radiusOuter = 180;
    const radiusInner = 160;
    const strokeWidth = 15;
    const totalWidth = radiusOuter * 2 + strokeWidth;
    const center = totalWidth / 2;
    const circumferenceOuter = 2 * Math.PI * radiusOuter;
    const circumferenceInner = 2 * Math.PI * radiusInner;
    const arcLengthInner = circumferenceInner * timeLeft / durationInSeconds;
    const startRotations = startTimes.map((startTime) => circumferenceOuter * startTime / totalDuration);

    return (
        <svg height={totalWidth} width={totalWidth}>
            <circle
                fill='transparent'
                stroke='white'
                strokeWidth={strokeWidth}
                r={radiusOuter}
                cx={center}
                cy={center}
            />
            <circle
                fill='transparent'
                stroke='white'
                strokeWidth={strokeWidth}
                r={radiusInner}
                cx={center}
                cy={center}
            />
            {phaseCycle.map((phase, i) => {
                if (i < phaseIndex) return;
                const arcLength = phase.duration / totalDuration * circumferenceOuter;
                let currArcLength;
                if (i === phaseIndex) {
                    currArcLength = arcLength * timeLeft / durationInSeconds;
                }
                else {
                    currArcLength = arcLength;
                }

                const color = phase.color;
                return (
                    <circle
                        fill='transparent'
                        stroke={color}
                        strokeWidth={strokeWidth}
                        strokeDasharray={`${currArcLength} ${circumferenceOuter}`}
                        strokeDashoffset={-(circumferenceOuter - arcLength) + startRotations[i]}
                        strokeLinecap='round'
                        r={radiusOuter}
                        cx={center}
                        cy={center}
                        style={{transition: 'stroke-dasharray 0.99s linear'}}
                        transform={`rotate(-90 ${center} ${center})`}
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
                cx={center}
                cy={center}
                style={{ transition: 'stroke-dasharray 0.99s linear, stroke 0.99s linear' }}
                transform={`rotate(-90 ${center} ${center})`}
            />
            <text
                x={center}
                y={center - 42 - 24}
                dominantBaseline='middle'
                textAnchor='middle'
                fill='white'
                fontSize='24px'
            >
                {`#${phaseCount + 1} - ${phase.name}`}
            </text>
            <text
                class='font-extralight'
                x={center}
                y={center + 6}
                textAnchor='middle'
                dominantBaseline='middle'
                fontSize='84px'
                fill='white'
            >
                {timeString}
            </text>
        </svg>
    )
}

function StartButton({onButtonClick, isRunning}) {
    const startStyles = 'bg-green-200 text-green-600 hover:bg-green-300 hover:text-green-700';
    const pauseStyles = 'bg-amber-200 text-amber-600 hover:bg-amber-300 hover:text-amber-700';

    let text, styles;

    if (isRunning) {
        text = "Pause";
        styles = pauseStyles;
    }
    else {
        text = "Start";
        styles = startStyles;
    }
    return (
        <RoundButton text={text} styles={styles} onButtonClick={onButtonClick} />
    )
}

function SkipButton({onButtonClick}) {
    const text = 'Skip';
    const styles = 'bg-rose-200 text-rose-600 hover:bg-rose-300 hover:text-rose-700';

    return (
        <RoundButton text={text} styles={styles} onButtonClick={onButtonClick} />
    )
}


export default function Timer({phaseCycle, phaseCount, phaseIndex, incrementPhase}) {
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const durationInSeconds = phaseCycle[phaseIndex].duration * 60;

    const timeLeft = durationInSeconds - timeElapsed;

    const counter = () => setTimeElapsed(prevTime => prevTime + 1);
    const handleStartButtonClick = () => setIsRunning((wasRunning) => !wasRunning);
    const handleSkipButtonClick = () => {
        setIsRunning(false);
        setTimeElapsed(0);
        incrementPhase();
    }
    const handlePhaseComplete = () => {
        setIsRunning(false);
        setTimeElapsed(0);
        incrementPhase();
    }

    useEffect(() => {
        let timer;
        if (isRunning & timeLeft > 0) {
            timer = setTimeout(counter, 1000);
        }
        else if (timeLeft <= 0) {
            timer = setTimeout(handlePhaseComplete, 1000)
        }
        return (() => clearTimeout(timer));
    }, [isRunning, timeElapsed]);

    return (
        <div class="flex-col justify-items-center m-5">
            <TimerRings 
                phaseCycle={phaseCycle}
                phaseCount={phaseCount}
                phaseIndex={phaseIndex}
                timeLeft={timeLeft}
            />
            <div class="flex justify-between">
                <StartButton onButtonClick={handleStartButtonClick} isRunning={isRunning} />
                <SkipButton onButtonClick={handleSkipButtonClick} />
            </div>
        </div>
    );
}