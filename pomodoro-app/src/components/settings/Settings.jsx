import { useState } from "react";
import TimeSetting from "./TimeSetting";

export default function Settings( {settingsModalRef, phases, setPhases} ) {
    const handleTimeChange = (e, index) => {
        let nextPhases = phases.map((phase) => ({...phase}));
        nextPhases[index].duration=Number(e.target.value);
        setPhases(nextPhases);
    }

    const handleBackButtonClick = () => {
        settingsModalRef.current.close();
    }

    return (
        <dialog ref={settingsModalRef} class="bg-neutral-900 w-1/3 min-w-96 rounded-xl px-8 py-4 border border-neutral-600">
            <div class="relative flex justify-center items-center mb-4">
                <button class="flex absolute left-0 text-lime-400 items-center py-2 pr-2 rounded-lg hover:bg-neutral-800" onClick={handleBackButtonClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                    </svg>
                    Back
                </button>
                <h2 class="text-neutral-100 text-2xl">Settings</h2>
            </div>
            <div class="mx-1">
                <div class="mb-2 px-2">
                    <h2 class="text-neutral-100 text-xl">Times (mins.)</h2>
                </div>
                <div class="bg-neutral-900 border rounded-lg border-neutral-600 px-2">
                    <div class="flex flex-col divide-y">
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
                </div>
            </div>
        </dialog>
    );
}