import React, { useState } from "react";
import Timer from "../components/Timer";
import Settings from "../components/settings/Settings";


export default function HomePage() {
    const [phaseCount, setPhaseCount] = useState(0); //0,2,4,6 work, 1,3,5 short, 7 long
    let phase; // 0 work, 1 short, 2 long
    
    if (phaseCount === 7) phase = 2;
    else if (phaseCount === 1 || phaseCount === 3 || phaseCount === 5) phase = 1;
    else phase = 0;
    
    // I use strings for these cause for some reason the input field value is a string
    const [timeValues, setTimeValues] = useState(["25", "5", "15"]); // minutes for work, short, long
    const timeValueNumbers = [Number(timeValues[0]), Number(timeValues[1]), Number(timeValues[2])];
    
    let currentTimeLength = timeValueNumbers[phase] * 60;

    return (
        <div class="flex flex-col bg-gray-500 w-screen h-screen justify-center items-center">
            <Timer timeLength={currentTimeLength}/>
            <Settings timeValues={timeValues} setTimeValues={setTimeValues}/>
        </div>
    );
}