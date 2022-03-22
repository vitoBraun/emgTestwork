import React, {useContext} from 'react';
import {NavLink, useNavigate} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'
import {Navbar, Nav, Container}from 'react-bootstrap'

export const NavbarCmp = () => {   
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const logoutHandler = event =>{
        event.preventDefault();
        auth.logout()
        navigate('/')
    }
    return (<>
  <Navbar collapseOnSelect bg="dark" variant="dark" expand="sm" sticky="top">
  <Container>
    {/* <Navbar.Brand href="#home"></Navbar.Brand> */}
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
      <NavLink className="nav-link" to='/upload'>Загрузка файла на сервер</NavLink> 

      <NavLink className="nav-link" to='/' onClick={logoutHandler}>Выйти</NavLink>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

</>
    )
}