import React, {useState} from "react";
import {Button, Collapse, Nav, NavItem, NavLink,} from "reactstrap";
import {Link} from "react-router-dom";
import "./NavMenu.css";
import LoginButton from "./Auth/LoginButton";
import {useAuth0} from "@auth0/auth0-react";
import LogoutButton from "./Auth/LogoutButton";

const NavMenu = ({className}) => {
  const [show, setShow] = useState(true);
  const toggle = () => setShow(!show);

  return (
    <header className={className}>
      <nav className="p-3">
        <Button onClick={toggle} className="float-end d-lg-none" color="light">
          <i className="fa-solid fa-bars"></i>
        </Button>
        <div>
          <a href="/" className="nav-link"><h1>Smart Spender</h1></a>
        </div>

        <Collapse isOpen={show} className="mt-3 d-lg-none">
          <NavContent/>
        </Collapse>
        <NavContent className="d-none d-lg-block" style={{ width: 250 }}/>
      </nav>
    </header>
  );
};

const NavContent = (props) => {
  const {isAuthenticated} = useAuth0();
  const today = new Date();
  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Transactions",
      path: `/transactions/${today.getFullYear()}/${today.getMonth() + 1}`,
    },
  ];

  return (
    <Nav vertical {...props}>
      {
        isAuthenticated ?
          <>
            {links.map((link, index) => (
              <NavItem key={index}>
                <NavLink tag={Link} to={link.path} className="nav-tab">
                  {link.name}
                </NavLink>
              </NavItem>
            ))}
            <NavItem>
              <LogoutButton/>
            </NavItem>
          </>
          : <>
            <NavItem>
              <LoginButton/>
            </NavItem>
          </>
      }
    </Nav>
  );
}

export {NavMenu};
