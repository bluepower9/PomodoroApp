import { useState, useRef } from "react";
import Settings from "../components/settings/Settings";
import NavBar from "../components/NavBar/NavBar";
import Notes from "../components/Notes/Notes";
import TimerPanel from "../components/TimerPanel";


export default function HomePage() {
    /* STATE */
    const [phases, setPhases] = useState([
        {name: "Work", duration: 25, color: "#FF005E", darkColor: "#4D001C"},
        {name: "Short Break", duration: 5, color: "#6FFF00", darkColor: "#214B00"},
        {name: "Long Break", duration: 15, color: "#00EEFF", darkColor: "#00474D"}
    ]);
    const [phaseCount, setPhaseCount] = useState(0);
    const [numShortBreaks, setNumShortBreaks] = useState(3);

    const settingsModalRef = useRef(null);

    return (
        <div class="flex flex-col justify-center bg-black font-sans min-h-screen">
            <Settings settingsModalRef={settingsModalRef} phases={phases} setPhases={setPhases} />
            <NavBar settingsModalRef={settingsModalRef} />
            <div class="flex w-full justify-stretch mt-16 py-8 max-w-[90rem] mx-auto px-8">
                <div class="flex flex-1 min-w-80">
                    <Notes />
                </div>
                <TimerPanel
                    phases={phases}
                    phaseCount={phaseCount}
                    setPhaseCount={setPhaseCount}
                    numShortBreaks={numShortBreaks}
                />
                <div class="flex flex-1 justify-end h-fit min-w-80">
                    <div class="flex text-white bg-zinc-800 text-4xl px-2 pb-2 rounded-xl">
                        Filler
                    </div>
                </div>
            </div>
        </div>
    );
}