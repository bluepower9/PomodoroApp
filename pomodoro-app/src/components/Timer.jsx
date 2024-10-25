import React from "react";
import {useState, useEffect} from 'react';

export default function Timer() {
    const [time, setTime] = useState(5);
    const countdown = setInterval(counter, 1000);

    function counter() {
        if (time > 0) {
            setTime(time - 1);
        }
        else {
            clearInterval(countdown);
        }
    }

    return (
        <div class="bg-black w-60 content-center rounded-2xl">
            <h1 class="flex justify-center text-white text-8xl pb-3">{time}</h1>
        </div>
    );
}