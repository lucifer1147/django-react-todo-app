import './App.css';
import NavBar from "./components/NavBar";
import {Outlet} from "react-router-dom";

function App() {
    return (
        <div className="App bg-gradient-to-r from-emerald-500 to-blue-400">
            <NavBar/>
            <Outlet/>
        </div>
    );
}

export default App;
