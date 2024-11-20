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

    const data = localStorage.getItem('notes');
    console.log('allnotes: ', data)
    let allNotes = [];

    try{
        allNotes = JSON.parse(data);
    } catch{
        console.log('Error retrieving notes from local storage.');
        allNotes = [];
    }

    if(data === ''){
        // return <div></div>;
        return;
    }

    for(let i=allNotes.length-1; i>=0; i--){
        let n = allNotes[i];
        let date = new Date(n['date']);

        console.log(date);

        notes.push(<MinimizedNote date={`${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`} expand={()=>expandNote(i)} note={n['note']}/>);
        
    }

    return (
        notes.length>0?notes:
        <div class="flex h-full w-full mb-5 items-center justify-center">
            <h1 class="text-gray-800">You have no saved notes.</h1>
        </div>
    );
}


function NewNote(props){

    const saveNote = () => {
        const date = new Date();
        let allNotes = localStorage.getItem('notes');

        try{
            allNotes = JSON.parse(allNotes);
        } catch{
            allNotes = [];
        }
        
        const id = (allNotes!==null || allNotes.length!==0)?allNotes.at(-1)['id']+1:1;
        const title = document.getElementById("newNoteTitle").value.trim();
        const note = document.getElementById("newNoteBody").value.trim();
        
        console.log('id: ', id, 'date: ', date, 'title:', title, 'note:', note);

        if(title === "" || note === ""){
            return;
        }

        const data = {'id': id, 'title': title, 'note': note, 'date': date};

        if(allNotes !== null){
            allNotes.push(data);
        }else{
            allNotes = [data];
        }

        localStorage.setItem('notes', JSON.stringify(allNotes));
        props.setNoteView(null);
    }

    return (
        <div class="flex flex-col w-full h-full p-2">
            <div class="flex flex-1 w-full h-8 ml-1">
                <label class="font-medium">Title:</label>
                <textarea id="newNoteTitle" maxlength="50" placeholder="add title" class="flex bg-gray-400 resize-none w-full mb-1 ml-2 outline-0 placeholder-gray-800"></textarea>
            </div>
            <hr class="border-[1.5px] rounded-full"></hr>
            <textarea id="newNoteBody" placeholder="add new note" class="h-full w-full mt-2 bg-gray-400 outline-0 resize-none rounded-b-xl placeholder-gray-800"></textarea>
            <button onClick={() => saveNote()}>
            <svg class="absolute right-0 bottom-0 mb-4 mr-5 bi bi-floppy-fill w-8 text-gray-800 fill-current hover:text-gray-700" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 16 16">
                <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z"/>
                <path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z"/>
            </svg>
            </button>
        </div>
    );
}


function getExpandedNote(id){
    const data = localStorage.getItem('notes');
    const notes = JSON.parse(data);

    let note = null;

    for(let i=0; i<notes.length; i++){
        if(notes[i]['id'] === id){
            note = notes[i];
            break;
        }
    }

    console.log('note: ', note);
    return (note!==null?
        <div class="flex flex-col w-full h-full p-2">
            <label class="text-xl font-bold mb-1 ml-1">{note['title']}</label>
            <hr class="border-[1.5px] rounded-full"></hr>
            <p class="m-1 overflow-y-auto">{note['note']}</p>
        </div>:""

    );
}


export default function NotesDisplay(props){
    const [expandNote, setExpandNote] = useState(null); // null=list all notes, 0=new note, everything else=view note with id


    const getView = () => {
        if(expandNote === null){
            console.log('showing all notes');
            return (
            <div class="relative w-full h-full">
                    <button class="absolute bottom-0 right-0 rounded-full p-2 mb-3 mr-5 bg-gray-300 opacity-70 hover:opacity-90" onClick={()=>setExpandNote(0)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-file-earmark-plus-fill w-10" viewBox="0 0 16 16">
                        <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0"/>
                    </svg>
                    </button>
                <div class="flex flex-col w-full h-full overflow-y-auto">
                    {generateNotes((x)=>setExpandNote(x))}
                </div>
            </div>
            );
        } 
        else if(expandNote === 0){
            return (
            <div class="relative h-full w-full px-6">
                <button class="absolute left-0 top-0 mt-[7px] ml-1 bg-gray-200 rounded-full hover:bg-gray-300" onClick={() => setExpandNote(null)}>
                    <svg class="w-7 bi bi-arrow-left-short" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
                    </svg>
                </button>
                <NewNote setNoteView={(x) => setExpandNote(x)}/>
            </div>
            );
        } else{
            return (
                <div class="relative px-6">
                    <button class="absolute left-0 top-0 mt-[7px] ml-1 bg-gray-200 rounded-full hover:bg-gray-300" onClick={() => setExpandNote(null)}>
                        <svg class="w-7 bi bi-arrow-left-short" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
                        </svg>
                    </button>
                    {getExpandedNote(expandNote)}
                </div>
            )
        }
    }

    return props.show?(
        <div class="relative flex flex-col h-full w-full bg-gray-400 rounded-b-xl max-h-full">
            {getView()}
        </div>
    ): "";
}