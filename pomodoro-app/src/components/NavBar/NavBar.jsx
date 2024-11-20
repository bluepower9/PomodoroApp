import React from "react";


export default function NavBar(props){
    return (
        <>
            <div class="fixed top-0 w-screen h-16 px-10 items-center justify-center bg-zinc-900 backdrop-blur">
                <div class="relative max-w-6xl h-full mx-auto">
                    <div class="absolute flex w-fill left-0 top-0 bottom-0 justify-center items-center">
                        <img src='./src/assets/pomopic.svg' class="max-h-full"/>
                        <div class="pt-1 text-white text-4xl px-2 font-heading">
                            <a href="">Pomodoro</a>
                        </div>
                    </div>
                    <div class="absolute flex w-fill right-0 top-0 bottom-0 justify-center items-center divide-x">
                        <div class="">

                        </div>
                        <div class="text-white hover:text-gray-200 px-2">
                            <a href="">login</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="h-16 mb-4"></div>
        </>
    );
};