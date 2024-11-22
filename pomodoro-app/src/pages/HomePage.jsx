import React, { useMemo, useState, useRef} from "react";
import Timer from "../components/Timer";
import Settings from "../components/settings/Settings";
import usePhase from '../hooks/timerHooks'
import NavBar from "../components/NavBar/NavBar";
import Notes from "../components/Notes/Notes";
import ControlButtons from "../components/ControlButtons";


export default function HomePage() {
    /* STATE */
    const [phases, setPhases] = useState([
        {name: "Work", duration: 25, color: "#FF005E"},
        {name: "Short Break", duration: 5, color: "#6FFF00"},
        {name: "Long Break", duration: 15, color: "#00EEFF"}
    ]);
    const [phaseCount, setPhaseCount] = useState(0); //0,2,4,6 work, 1,3,5 short, 7 long according to phaseOrder
    const [numShortBreaks, setNumShortBreaks] = useState(3);

    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const dialogRef = useRef(null);
    
    /* CALCULATED FROM STATE */
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

    /* FUNCTIONS */
    const incrementPhase = () => setPhaseCount(currentPhaseCount => (currentPhaseCount + 1));

    return (
        <div class="flex flex-col justify-center bg-black font-sans min-h-screen">
            <NavBar />
            <Settings dialogRef={dialogRef} phases={phases} setPhases={setPhases} />
            <div class="flex w-full justify-stretch mt-16 py-8 max-w-[90vw] mx-auto px-8">
                <div class="flex flex-1 min-w-80">
                    <Notes />
                </div>
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
                            dialogRef={dialogRef}
                            setTimeElapsed={setTimeElapsed}
                            incrementPhase={incrementPhase}
                        />
                    </div>
                </div>
                <div class="flex flex-1 justify-end h-fit min-w-80">
                    <div class="flex text-white bg-zinc-800 text-4xl px-2 pb-2 rounded-xl">
                        Filler
                    </div>
                </div>
            </div>
        </div>
    );
}