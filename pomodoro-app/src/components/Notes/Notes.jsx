import React, { useState } from "react";
import NotesDisplay from "./NotesDisplay";



export default function Notes(props){
    const [expanded, setexpanded] = useState(true);

    const expIcon = () => {
        return (expanded?
            <path fill-rule="evenodd" stroke="currentColor" stroke-width=".75" d="M.172 15.828a.5.5 0 0 0 .707 0l4.096-4.096V14.5a.5.5 0 1 0 1 0v-3.975a.5.5 0 0 0-.5-.5H1.5a.5.5 0 0 0 0 1h2.768L.172 15.121a.5.5 0 0 0 0 .707M15.828.172a.5.5 0 0 0-.707 0l-4.096 4.096V1.5a.5.5 0 1 0-1 0v3.975a.5.5 0 0 0 .5.5H14.5a.5.5 0 0 0 0-1h-2.768L15.828.879a.5.5 0 0 0 0-.707"/>
            :
            <path fill-rule="evenodd" stroke="currentColor" stroke-width=".75" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707m4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707"/>

        );
    }

    return (
        <div class={`flex flex-col h-[50vh] w-full`}>
            {/* <div class={`h-full w-full bg-yellow-200 ${expanded?'animate-note-expand':'animate-note-shrink'}`}> */}
            {/* ${expanded?"w-full rounded-t-xl": "w-48 rounded-xl"} */}
            <div class={`transition-all duration-1000 ease-in-out ${expanded?'h-full w-full': 'w-48 h-16'}`}>
                <div class={`flex bg-zinc-800 min-w-48 h-fit text-3xl px-3 pb-2 text-white hover:cursor-pointer ${expanded?"rounded-t-xl": "rounded-xl transition hover:scale-110"}`} onClick={()=>setexpanded(!expanded)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="flex bi bi-pencil-square w-6 pt-2" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                    </svg>
                    <h1 class="ml-3 mr-6 pt-1">Notes</h1>
                    <svg class="bi bi-arrows-angle-expand ml-auto w-4 pt-2" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        {expIcon()}
                    </svg>
                </div>
                <div class="h-full w-full">
                    <NotesDisplay show={expanded}/>
                </div>
                </div>
        </div>
    );
}