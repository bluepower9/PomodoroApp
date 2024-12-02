import React, { useState } from "react";

function dateString(date){
    return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
}

function MinimizedNote(props){
    return (
        <div class="flex flex-col w-full px-2 pt-2 hover:cursor-pointer hover:bg-zinc-500" onClick={props.expand}>
            <div class="flex">
                {/* <label class="w-24 text-sm font-medium border-white border-r-[2px] pr-2 hover:cursor-pointer">{props.date}</label> */}
                <div class="flex flex-col w-full pl-2">
                    <label class="flex self-start text-xs font-bold hover:cursor-pointer">{props.date}</label> 
                    <label class="text-base font-bold line-clamp-1 hover:cursor-pointer">{props.title}</label>
                    <p class="w-full line-clamp-1 text-sm">{props.note}</p>
                </div>
            </div>
            <hr class="border-[1.5px] rounded-full mt-1" />
        </div>
    );
}


function generateNotes(expandNote) {
    let notes = [];

    const data = localStorage.getItem('notes');
    // console.log('allnotes: ', data)
    let allNotes = [];

    try{
        allNotes = JSON.parse(data);
        if(allNotes === null){
            allNotes = [];
        }
    } catch{
        console.log('Error retrieving notes from local storage.');
        allNotes = [];
    }

    if(data === ''){
        return;
    }

    for(let i=allNotes.length-1; i>=0; i--){
        let n = allNotes[i];
        let date = new Date(n['date']);
        const id = n['id'];

        notes.push(<MinimizedNote date={dateString(date)} expand={()=>expandNote(id)} note={n['note']} title={n['title']}/>);
        
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
        
        const id = (allNotes!==null && allNotes.length!==0)?allNotes.at(-1)['id']+1:1;
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
                <textarea id="newNoteTitle" maxlength="40" placeholder="add title" class="flex bg-zinc-400 resize-none w-full mb-1 ml-2 outline-0 placeholder-zinc-800"></textarea>
            </div>
            <hr class="border-[1.5px] rounded-full"></hr>
            <textarea id="newNoteBody" placeholder="add new note" class="h-full w-full mt-2 bg-zinc-400 outline-0 resize-none rounded-b-xl placeholder-zinc-800"></textarea>
            <button onClick={() => saveNote()}>
                <svg class="absolute right-0 bottom-0 mb-4 mr-5 bi bi-floppy-fill w-8 text-zinc-800 fill-current hover:text-zinc-700" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 16 16">
                    <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z"/>
                    <path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z"/>
                </svg>
            </button>
        </div>
    );
}


function OptionsWidget({buttons}){
    return (
        <div class="absolute flex h-fit mt-16 mr-2 right-0 top-0 bottom-0">
            <div class="flex flex-col w-12 h-full rounded-2xl px-2 py-3 bg-zinc-600 space-y-4">
                {buttons}
            </div>
        </div>
    );
}


function editNotesOptions(noteId, setWidget){
    const bodyEl = document.getElementById("noteBody");
    let originalBody = "";
    if(bodyEl !== null){
        originalBody = bodyEl.innerText;
    }

    // Button functions
    const resetEdit = () => {
        bodyEl.innerText = originalBody;
    }

    const exitEdit = () =>{
        resetEdit();
        setWidget(1);
        bodyEl.contentEditable = false;
    }

    const saveEdit = () => {
        const body = bodyEl.innerText;
        const notesData = localStorage.getItem('notes');
        let notes = [];
        
        try{
            notes = JSON.parse(notesData);
            let note = null;
            for(let i=0; i<notes.length; i++){
                if(notes[i]['id'] === noteId){
                    note = notes[i];
                    break;
                }
            }

            note['note'] = body;
            localStorage.setItem('notes', JSON.stringify(notes));
            console.log('note: ', note, '\nnotes: ', notes)
        } catch{
            console.log('Error retrieving notes while saving edit.');
        }

        // disables edit area and changes widgets bar
        bodyEl.contentEditable = false;
        setWidget(1);
    }

    const buttons = [
        <button class="flex justify-center hover:text-zinc-400" onClick={exitEdit}>
            <svg fill="currentColor" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="12.8">
                <g id="SVGRepo_bgCarrier" stroke-width="0">
                </g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
                </g>
                <g id="SVGRepo_iconCarrier"> 
                    <path d="M202.82861,197.17188a3.99991,3.99991,0,1,1-5.65722,5.65624L128,133.65723,58.82861,202.82812a3.99991,3.99991,0,0,1-5.65722-5.65624L122.343,128,53.17139,58.82812a3.99991,3.99991,0,0,1,5.65722-5.65624L128,122.34277l69.17139-69.17089a3.99991,3.99991,0,0,1,5.65722,5.65624L133.657,128Z"></path> 
                </g>
            </svg>
        </button>,
        <button class="flex justify-center hover:text-zinc-400" onClick={resetEdit}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-arrow-counterclockwise w-8" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z"/>
                <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466"/>
            </svg>
        </button>,
        <button class="flex justify-center hover:text-zinc-400" onClick={saveEdit}>
            <svg class="bi bi-floppy-fill w-7 fill-current" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 16 16">
                <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z"/>
                <path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z"/>
            </svg>
        </button>
    ];

    return <OptionsWidget buttons={buttons}></OptionsWidget>
}


function viewNotesOptions(showConfirmation, changeWidget){
    // Creates note options on right side when viewing note. Currently supports delete and edit.

    const editNote = () => {
        changeWidget(2);
        const body = document.getElementById('noteBody');
        const outerdiv = document.getElementById('noteBodyOuterDiv');
        // body.disabled = false;
        body.contentEditable = true;
    }

    const buttons = [
            <button class="" onClick={showConfirmation}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-trash w-8 hover:text-zinc-400" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>
            </button>,
            <button class="" onClick={editNote}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-pencil-fill w-7 hover:text-zinc-400" viewBox="0 0 16 16">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                    </svg>
            </button>
    ];
    

    return <OptionsWidget buttons={buttons}></OptionsWidget>
}


function RenderOptionsWidget({noteId, widget, changeWidget, showConfirmation}){
    const viewWidget = viewNotesOptions(showConfirmation, changeWidget);
    const editWidget = editNotesOptions(noteId, changeWidget);

    console.log('widget view: ', widget);

    if(widget === 1) {
        return viewWidget;
    }
    else if(widget === 2){
        return editWidget;
    }
    else{
        return "";
    }
}


function confirmationBox(show, hideConfirmation, deleteNote){
    // Creates confirmation box to delete a note
    return show?(
        <div class="absolute flex w-full h-full z-30 rounded-b-xl bg-zinc-600 bg-opacity-70 justify-center items-center">
            <div class="relative flex flex-col p-2 bg-zinc-400 rounded-xl shadow-lg shadow-zinc-700">
                <div class="absolute top-0 right-0">
                    <button class="" onClick={hideConfirmation}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-x w-5" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                        </svg>
                    </button>
                </div>
                <label class="mt-2">Are you sure you want to delete this note?</label>
                <div class="flex mt-2 w-full justify-center">
                    <button class="bg-zinc-600 text-white w-10 px-2 py-1 rounded-lg hover:bg-zinc-500 mr-5" onClick={deleteNote}>
                        yes
                    </button>
                    <button class="bg-zinc-600 text-white w-10 px-2 py-1 rounded-lg hover:bg-zinc-500" onClick={hideConfirmation}>
                        no
                    </button>
                </div>
            </div>
        </div>
    ): "";
}


function getExpandedNote(id, backClick){
    const data = localStorage.getItem('notes');
    const notes = JSON.parse(data);
    const [showConfirmation, updateShowConfirmation] = useState(false);
    const [widget, updateWidget] = useState(1); // 0=hide, 1=view, 2=edit

    if(id === null || id < 1){
        if(widget !== 1){
            updateWidget(1);
        }
        return "";
    }

    let note = null;
    let idx = -1;

    for(let i=0; i<notes.length; i++){
        if(notes[i]['id'] === id){
            note = notes[i];
            idx = i;
            break;
        }
    }

    let date = new Date(note['date']);

    const deleteNote = () => {
        let notesCopy = notes.slice();
        notesCopy.splice(idx,1);
        localStorage.setItem('notes', JSON.stringify(notesCopy));
        updateShowConfirmation(false);
        backButtonClick();
    }

    const backButtonClick = () => {
        backClick();
        updateWidget(1);
    }

    return (note!==null?
        <div class="relative flex flex-col w-full h-full">
            {confirmationBox(showConfirmation, ()=>updateShowConfirmation(false), ()=>deleteNote())}
            <div class="absolute flex top-0 w-full bg-zinc-400 bg-opacity-80">
                <button class="mt-2 h-full ml-1 bg-gray-200 rounded-full hover:bg-gray-300" onClick={backButtonClick}>
                    <svg class="w-7 bi bi-arrow-left-short" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
                    </svg>
                </button>
                <div class="flex flex-col w-full justify-end mt-0 mr-8">
                    <div class="flex h-full justify-end">
                        <label class="font-bold text-sm">{dateString(date)}</label>
                    </div>
                    <div class="flex w-full h-full p-0">
                        <label class="text-base line-clamp-1 break-all font-bold ml-3">{note['title']}</label>
                    </div>
                    <hr class="border-[1.5px] rounded-full ml-1"></hr>
                </div>
            </div>
            <RenderOptionsWidget widget={widget} noteId={id} changeWidget={(x)=>updateWidget(x)} showConfirmation={()=>updateShowConfirmation(true)}></RenderOptionsWidget>
            <div id="noteBodyOuterDiv" class="w-full h-full pl-9 pr-12 rounded-b-xl overflow-y-auto">
                <p id="noteBody" spellCheck='false' disabled class="w-full h-fit mt-12 whitespace-pre-wrap outline-none bg-zinc-400 resize-none inline-block">
                {note['note']}
                </p>
                {/* {note['note']} */}
            </div>
        </div>:<div></div>

    );
}


export default function NotesDisplay(props){
    const [expandNote, setExpandNote] = useState(null); // null=list all notes, 0=new note, everything else=view note with id

    const listNotesView = (
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

    const newNoteView = (
        <div class="relative h-full w-full px-6">
            <button class="absolute left-0 top-0 mt-[7px] ml-1 bg-gray-200 rounded-full hover:bg-gray-300" onClick={() => setExpandNote(null)}>
                <svg class="w-7 bi bi-arrow-left-short" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
                </svg>
            </button>
            <NewNote setNoteView={(x) => setExpandNote(x)}/>
        </div>
    );

    const expandNoteView = (
        <div class="relative h-full w-full">
            {getExpandedNote(expandNote, ()=>setExpandNote(null))}
        </div>
    );


    const getView = () => {
        if(expandNote === null){
            return listNotesView;
        } 
        else if(expandNote === 0){
            return newNoteView;
        } else{
            return expandNoteView;
        }
    }

    // if(props.show){
        return (
            <div class={`relative h-full w-full flex flex-col bg-zinc-400 rounded-b-xl transition duration-700 ${props.show?'opacity-1': 'opacity-0'}`}>
                {getView()}
            </div>
        )
    // }
    // else{
    //     if(expandNote !== null){
    //         setExpandNote(null);
    //     }
        
    //     return "";
    // }
}