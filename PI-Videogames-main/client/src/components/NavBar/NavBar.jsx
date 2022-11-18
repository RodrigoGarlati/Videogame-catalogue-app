import React from "react";
import { Link } from "react-router-dom";
//import { Link } from "react-router-dom";

const Nav = function(){
    return(
        <div>
            <ul>
                <Link to="/">
                    <img alt="LOGO"/>
                </Link>
                <Link to="/home">
                    <li>
                        HOME
                    </li>
                </Link>
                <Link to="/creategame">
                    <li>
                        CREATE GAME
                    </li>
                </Link>
                <Link to="/genres">
                    <li>
                        SEE GENRES
                    </li>
                </Link>
                <Link to="/creategenre">
                    <li>
                        CREATE GENRE
                    </li>
                </Link>
            </ul>
        </div>
    )
}

export default (Nav)