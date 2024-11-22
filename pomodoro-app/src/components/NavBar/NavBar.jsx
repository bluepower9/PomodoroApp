import React from "react";


export default function NavBar(props){
    return (
        <div class="flex fixed top-0 w-full h-16 items-center bg-neutral-900 backdrop-blur">
            <div class="flex max-w-[90vw] w-full mx-auto px-8 h-7">
                <div class="flex items-center">
                    <img src='./src/assets/pomopic.svg' class="h-8"/>
                    <div class="pt-1 text-white text-2xl px-2 font-heading font-bold">
                        <a href="">Pomodoro</a>
                    </div>
                </div>
                <div class="flex items-center ml-auto border-l border-neutral-600 pl-2">
                    <a href="" class="py-1 px-2 text-lime-400 rounded-lg hover:bg-neutral-800">Login</a>
                </div>
            </div>
        </div>
    );
};