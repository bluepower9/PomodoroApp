import React from "react";
import HomePage from "./pages/HomePage";
import './styles.css';



class App extends React.Component {
    constructor(props) {
        super(props);
    }


    render(){
        return (
            <HomePage/>
        );
    }
}

export default App;