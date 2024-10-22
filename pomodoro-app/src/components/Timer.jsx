import React from "react";
import {useState, useEffect} from 'react';

class Timer extends React.Component{
    constructor(props){
        super(props);
        this.timer = 0;

        this.state = {
            time: 5,
            running: false
        }
    }


    componentDidMount(){
        console.log('mounted')
        this.startTimer();
    }

    startTimer(){
        this.timer = setInterval(() => {this.countdown()}, 1000);
        console.log('timer', this.timer);
        console.log('starting timer');
    }

    countdown(){
        if(this.state.time==0){
            console.log('clearing')
            clearInterval(this.timer)
        }
        else{
            this.setState({
                time: this.state.time-1
            })
        }

    }

    render(){

        return (
            <div class="bg-black w-60 content-center rounded-2xl">
                <h1 class="flex justify-center text-white text-8xl pb-3">{this.state.time}</h1>
            </div>
        );
    }
}


export default Timer;