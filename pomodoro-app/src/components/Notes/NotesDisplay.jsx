import React, { useState } from "react";

function MinimizedNote(props){
    return (
        <div class="flex flex-col w-fill px-2 pt-2 hover:cursor-pointer hover:bg-gray-300" onClick={props.expand}>
            <div class="flex">
                <label class="w-20 font-medium border-white border-r-[2px] pr-2 hover:cursor-pointer">{props.date}</label>
                <p class="line-clamp-1 pl-2">{props.note}</p>
            </div>
            <hr class="border-[1.5px] rounded-full mt-1" />
        </div>
    );
}


function generateNotes(expandNote) {
    let notes = [];
    
    for(let i=0; i<5; i++){
        notes.push(
            <MinimizedNote date={"11/2/2024"} expand={()=>expandNote(i)} note="super long test message. this is a long note to overflow the box. Lots of text here."/>
        )
    }

    return notes;
}


export default function NotesDisplay(props){
    const [expandNote, setExpandNote] = useState(null);

    return props.show?(
        <div class="flex flex-col h-full w-full bg-gray-400 rounded-b-xl">
            {generateNotes(setExpandNote)}
        </div>
    ): "";
}