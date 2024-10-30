import { useState } from "react";
import TimeSetting from "./TimeSetting";

export default function Settings( {timeValues, setTimeValues} ) {

    return (
        <div class="flex bg-gray-400 p-3 w-[25vw] justify-between rounded-xl">
            <TimeSetting
                label="Work Time"
                defaultTime={timeValues[0]}
                onTimeChange={(e) => {
                    let nextTimeValues = timeValues.slice();
                    nextTimeValues[0] = e.target.value;
                    setTimeValues(nextTimeValues);
                }}
            />
            <TimeSetting
                label="Short Break"
                defaultTime={timeValues[1]}
                onTimeChange={(e) => {
                    let nextTimeValues = timeValues.slice();
                    nextTimeValues[1] = e.target.value;
                    setTimeValues(nextTimeValues);
                }}
            />
            <TimeSetting
                label="Long Break"
                defaultTime={timeValues[2]}
                onTimeChange={(e) => {
                    let nextTimeValues = timeValues.slice();
                    nextTimeValues[2] = e.target.value;
                    setTimeValues(nextTimeValues);
                }}
            />
        </div>
    );
}