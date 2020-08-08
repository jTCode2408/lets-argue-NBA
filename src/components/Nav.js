import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Nav extends Component{
    constructor(props){
    super()
    }


    render(){

    return (
<div className="nav-cont">
    <nav>
        <Link to="/">Home</Link>
        <Link to="/player">Single Player</Link>
        <Link to="/compare">Compare Players</Link>
    </nav>
</div>
    );
    }
}

export default Nav;