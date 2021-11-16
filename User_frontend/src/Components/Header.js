import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import UserLogin from './User_Login/UserLogin';

const Header = () => (
  <div>
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#" className = "col-md-5 col-md-push-3 col-sm-12">  ShoppingCart</Navbar.Brand>
      <Nav className="me-auto">
      </Nav>

      <Nav>      
        <NavItem href="#" className="col-auto">
          {!(localStorage.getItem('savedUserToken')) ? UserLogin: <Link to="/cart">
            <a style={{ padding: '20px' }}>View Cart</a></Link>}
        </NavItem> 
         <NavItem href="#" className="col-auto">
          <Link to="/">Go Home Page</Link>
        </NavItem>

        <NavItem href="#" className="col-auto">
          {!(localStorage.getItem("savedUserToken")) ? UserLogin : <Link to="/">
            <Button block size="lg"
              className="btn btn-primary"
              onClick={() => localStorage.removeItem("savedUserToken")}
              type='submit' >LogOut</Button></Link>}
        </NavItem>
      </Nav>

    </Navbar>
  </div>
);

export default Header;

