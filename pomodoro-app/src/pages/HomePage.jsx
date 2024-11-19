import React, { useState } from "react";
import Timer from "../components/Timer";
import Settings from "../components/settings/Settings";
import usePhase from '../hooks/timerHooks'
import NavBar from "../components/NavBar/NavBar";
import Notes from "../components/Notes/Notes";


export default function HomePage() {
    /* STATE */
    // I use strings for these cause for some reason the input field value is a string
    const [phaseDurations, setPhaseDurations] = useState(["25", "5", "15"]); // minutes for work, short, long
    const [phaseCount, setPhaseCount] = useState(0); //0,2,4,6 work, 1,3,5 short, 7 long according to phaseOrder
    const phaseNames = ["Work", "Short Break", "Long Break"];
    
    /* CALCULATED FROM STATE */
    const phaseDurationValues = phaseDurations.map(duration => Number(duration));

    const phases = [
        {name: "Work", duration: phaseDurationValues[0] * 60, color: "#FF005E"},
        {name: "Short Break", duration: phaseDurationValues[1] * 60, color: "#6FFF00"},
        {name: "Long Break", duration: phaseDurationValues[2] * 60, color: "#00EEFF"}
    ];
    
    const phaseOrder = [0, 1, 0, 1, 0, 1, 0, 2];
    const phaseIndex = phaseOrder[phaseCount];

    /* FUNCTIONS */
    const updatePhaseCount = () => setPhaseCount(currentPhaseCount => (currentPhaseCount + 1) % phaseOrder.length);

    return (
        <div class="flex flex-col bg-black font-sans h-screen">
            <NavBar />
            <div class="flex w-full justify-center">
                <div class="flex w-full ml-5 ">
                    <Notes />
                </div>
                <div class="flex flex-col justify-center items-center mx-20">
                    <Timer
                        phases={phases}
                        phaseOrder={phaseOrder}
                        phaseCount={phaseCount}
                        updatePhaseCount={updatePhaseCount}
                    />
                    <div class="mt-5">
                        <Settings timeValues={phaseDurations} setTimeValues={setPhaseDurations}/>
                    </div>
                </div>
                <div class="flex w-full mr-5 justify-end h-fit">
                    <div class="flex text-white bg-zinc-800 text-4xl px-2 pb-2 rounded-xl">
                        Filler
                    </div>
                    
                </div>
            </div>
        </div>
    );
}