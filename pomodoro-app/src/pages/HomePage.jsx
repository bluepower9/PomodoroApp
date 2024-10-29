import React, { useState } from "react";
import Timer from "../components/Timer";


export default function HomePage() {
    const [defaultTimer, setDefaultTimer] = useState(62);


    return (
        <div class="flex bg-gray-500 w-screen h-screen justify-center items-center">
            <Timer time={defaultTimer}/>
        </div>
    );
}