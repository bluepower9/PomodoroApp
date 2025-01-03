import RoundButton from './ui/RoundButton';

function StartButton({onButtonClick, isRunning}) {
    const startStyles = 'bg-green-200 text-green-600 hover:bg-green-300 hover:text-green-700';
    const pauseStyles = 'bg-amber-200 text-amber-600 hover:bg-amber-300 hover:text-amber-700';

    let text, styles;

    if (isRunning) {
        text = (<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
            <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
        </svg>);
        styles = pauseStyles;
    }
    else {
        text = (<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
        </svg>);
        styles = startStyles;
    }
    return (
        <RoundButton text={text} styles={styles} onButtonClick={onButtonClick} />
    )
}

function SkipButton({onButtonClick}) {
    const text = (<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-skip-end-fill" viewBox="0 0 16 16">
        <path d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.693 3.3 4 3.678 4 4.308v7.384c0 .63.692 1.01 1.233.697L11.5 8.753V12a.5.5 0 0 0 1 0z"/>
      </svg>);
    const styles = 'bg-rose-200 text-rose-600 hover:bg-rose-300 hover:text-rose-700';

    return (
        <RoundButton text={text} styles={styles} onButtonClick={onButtonClick} />
    )
}

export default function ControlButtons({isRunning, setIsRunning, setTimeElapsed, incrementPhase}) {
    const handleStartButtonClick = () => setIsRunning((wasRunning) => !wasRunning);

    const handleSkipButtonClick = () => {
        setIsRunning(false);
        setTimeElapsed(0);
        incrementPhase();
    }

    return (
        <div class="flex justify-between">
            <StartButton onButtonClick={handleStartButtonClick} isRunning={isRunning} />
            <SkipButton onButtonClick={handleSkipButtonClick} />
        </div>
    );
}