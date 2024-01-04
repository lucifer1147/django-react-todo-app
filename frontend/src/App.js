import './App.css';
import NavBar from "./components/NavBar";
import {Outlet} from "react-router-dom";
import React, {useState} from 'react';

function App() {
    const [theme, toggleTheme] = useState("")
    const changeTheme = () => {
        if (theme.includes('dark')) {
            toggleTheme('')
        } else {
            toggleTheme('dark')
        }
    }

    return (
        <div className={"bg-gradient-to-r from-emerald-500 to-blue-400 " + theme}>
            <NavBar changeTheme={changeTheme}/>
            <Outlet/>
        </div>
    );
}

export default App;
