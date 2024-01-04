import React from "react";
import {Link} from "react-router-dom";

function NavBar(props) {
    return (<div
        className="sticky top-[-60px] z-20 px-24 py-6 bg-gray-100 flex flex-wrap justify-around shadow-2xl items-center dark:bg-slate-900 dark:text-white bg-opacity-80 backdrop-blur-sm dark:bg-opacity-80">
        <div className="w-full justify-center items-center mb-6">
            <h1 className="text-2xl font-extrabold text-center">TodoTracker</h1>
        </div>

        <ul className="flex gap-x-10">
            <li className="text-gray-700 dark:text-gray-300 font-semibold"><Link to="/">Home</Link></li>
            <li className="text-gray-700 dark:text-gray-300 font-semibold"><Link to="/">About</Link></li>
            <li className="text-gray-700 dark:text-gray-300 font-semibold"><a href='/api/'>API</a></li>
        </ul>


        <button className="py-2 px-4 bg-orange-400 text-white font-bold rounded-md dark:bg-pink-600"
                onClick={props.changeTheme}>Change
            Theme
        </button>
    </div>)
}

export default NavBar;
