import { useState } from "react";
import TimeSetting from "./TimeSetting";

export default function Settings( {phases, setPhases} ) {
    const handleTimeChange = (e, index) => {
        let nextPhases = phases.map((phase) => ({...phase}));
        nextPhases[index].duration=Number(e.target.value);
        setPhases(nextPhases);
    }
    return (
        <div class="flex bg-zinc-900 p-3 w-[25vw] justify-between rounded-xl">
            {
                phases.map((phase, index) => {
                    return (
                        <TimeSetting
                            label={phase.name}
                            defaultTime={phase.duration}
                            onTimeChange={(e) => {handleTimeChange(e, index)}}
                        />
                    );
                })
            }
        </div>
    );
}