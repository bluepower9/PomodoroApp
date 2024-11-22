import { useState, useMemo } from "react";
import Timer from "./Timer.jsx";
import ControlButtons from "./ControlButtons.jsx";

export default function TimerPanel({phases, phaseCount, setPhaseCount, numShortBreaks}) {
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const phaseOrder = useMemo(() => {
        const order = [];
        for (let i = 0; i < numShortBreaks; i++) {
            order.push(0, 1);
        }
        order.push(0, 2);
        return order;
    }, [numShortBreaks]);

    const phaseIndex = phaseCount % phaseOrder.length;

    const phaseCycle = useMemo(() => {
        return phaseOrder.map((index) => {
            return {...phases[index]};
        });
    });

    const incrementPhase = () => setPhaseCount(currentPhaseCount => (currentPhaseCount + 1));

    return (
        <div class="flex flex-1 grow mx-20">
            <div class="flex flex-col mx-auto">
                <Timer
                    phaseCycle={phaseCycle}
                    phaseCount={phaseCount}
                    phaseIndex={phaseIndex}
                    incrementPhase={incrementPhase}
                    isRunning={isRunning}
                    setIsRunning={setIsRunning}
                    timeElapsed={timeElapsed}
                    setTimeElapsed={setTimeElapsed}
                />
                <ControlButtons 
                    isRunning={isRunning}
                    setIsRunning={setIsRunning}
                    setTimeElapsed={setTimeElapsed}
                    incrementPhase={incrementPhase}
                />
            </div>
        </div>
    );
}