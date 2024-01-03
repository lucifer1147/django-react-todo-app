import React from "react";
import {Link} from "react-router-dom";

function NavBar(props) {
    return (
        <div className="px-24 py-12 bg-gray-100 flex justify-between shadow-2xl sticky top-0">
            <h1 className="text-xl font-extrabold">TodoTracker</h1>

            <ul className="flex gap-x-10">
                <li className="text-gray-700 font-semibold"><Link to="/">Home</Link></li>
                <li className="text-gray-700 font-semibold"><Link to="/">About</Link></li>
                <li className="text-gray-700 font-semibold"><a href='/api/'>API</a></li>
            </ul>

        </div>
    )
}

export default NavBar;
