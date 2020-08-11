import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {
    Navbar,
    Nav,
    NavItem,
    NavLink,
  } from 'reactstrap';

class Navigation extends Component{
    constructor(props){
    super()
    }


    render(){

    return (
<div className="nav-cont">
  
    <Nav pills>
        <NavItem>
        <NavLink href="/">Home</NavLink>
        </NavItem>

        <NavItem>
        <NavLink href="/player">Single Player</NavLink>
        </NavItem>

        <NavItem>
        <NavLink href="/compare">Compare Players</NavLink>
        </NavItem>
    </Nav>
</div>
    );
    }
}

export default Navigation;