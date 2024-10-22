import React from "react";
import Timer from "../components/Timer";

class HomePage extends React.Component{
    constructor(props){
        super(props);
    }


    render(){
        return (
            <div class="bg-gray-500 w-screen h-screen content-center ">
                <div class="flex justify-center">
                    <Timer/>
                </div>
            </div>
        );
    }
}


export default HomePage;