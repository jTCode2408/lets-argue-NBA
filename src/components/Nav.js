import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Navbar,Nav, NavItem, NavLink,} from 'reactstrap';
  import {NavCont} from './styles';

class Navigation extends Component{
    constructor(props){
    super()
    }


    render(){

    return (
<NavCont>
  
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
</NavCont>
    );
    }
}

export default Navigation;