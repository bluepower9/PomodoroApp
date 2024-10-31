import React, { useState } from "react";
import Timer from "../components/Timer";
import Settings from "../components/settings/Settings";
import usePhase from '../hooks/timerHooks'
import NavBar from "../components/NavBar/NavBar";


export default function HomePage() {
    const [phaseCount, setPhaseCount] = useState(0); //0,2,4,6 work, 1,3,5 short, 7 long
    let phase = 0; // 0 work, 1 short, 2 long
    
    if(phaseCount%2 === 0){
        phase = 0;
    }else if (phaseCount%7 === 0){
        phase = 2;
    } else{
        phase = 1;
    }

    // I use strings for these cause for some reason the input field value is a string
    const [timeValues, setTimeValues] = useState(["25", "5", "15"]); // minutes for work, short, long
    const timeValueNumbers = [Number(timeValues[0]), Number(timeValues[1]), Number(timeValues[2])];

    let currentTimeLength = timeValueNumbers[phase] * 60;


    return (
        <div class="flex flex-col bg-gray-500 w-screen h-screen justify-center items-center">
            <NavBar />
            <h1 class="text-5xl mb-5 text-gray-200 font-sans">{usePhase(phase)}</h1>
            <h1 class="text-3xl text-gray-900 font-medium font-sans">#{phaseCount+1}</h1>
            <Timer timeLength={currentTimeLength} updatePhase={()=>setPhaseCount(phaseCount+1)}/>
            <div class="mt-5">
                <Settings timeValues={timeValues} setTimeValues={setTimeValues}/>
            </div>
        </div>
    );
}