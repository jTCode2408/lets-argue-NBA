import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Nav, NavItem, NavLink,} from 'reactstrap';
  import {NavCont} from './styles';

class Navigation extends Component{
    constructor(props){
    super()
    }


    render(){

    return (
<NavCont>
  
    <Nav pills>
        <NavItem className="mx-5" style= {{width:200}}>
        <NavLink className="text-info" href="/">Home</NavLink>
        </NavItem>

        <NavItem className=" mx-5" style= {{width:200}}>
        <NavLink className="text-info" href="/player">Single Player</NavLink>
        </NavItem>

        <NavItem className=" mx-5" style= {{width:200}}>
        <NavLink className="text-info" href="/compare">Compare Players</NavLink>
        </NavItem>
    </Nav>
</NavCont>
    );
    }
}

export default Navigation;