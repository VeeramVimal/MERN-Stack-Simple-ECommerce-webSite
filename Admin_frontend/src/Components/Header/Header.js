import React from 'react';
// import {Nav, Navbar} from 'react-bootstrap';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import './index.css';
import AddProduct from '../Products/AddProduct';
import { Button } from 'react-bootstrap';

const Header = () => (
  <div>

    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Admin Management of Products </Navbar.Brand>
      <Nav className="me-auto">

      </Nav>
      <Nav>
      <NavItem href="#">
        {!(localStorage.getItem("savedToken")) ? AddProduct : <Link to="/list">
            <a style={{ padding: '20px' }}>Home</a></Link>}
          
        </NavItem>
        <NavItem href="#">
          {!(localStorage.getItem("savedToken")) ? AddProduct : <Link to="/">
            <Button block size="lg"
              className="btn btn-primary"
              onClick={() => localStorage.removeItem("savedToken")}
              type='submit' >LogOut</Button></Link>}

        </NavItem>
      </Nav>
    </Navbar>
  </div>
);

export default Header;

