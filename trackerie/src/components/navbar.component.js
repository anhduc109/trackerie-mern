import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faUser } from "@fortawesome/free-solid-svg-icons";
import { faStream } from "@fortawesome/free-solid-svg-icons";
import { faRunning } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

export default class CustomNavbar extends Component {
  render() {
    return (
      <Navbar fixed="top" bg="dark" variant="dark" expand="lg">
        <Link to="/" className="navbar-brand">
          <Navbar.Brand>
            <FontAwesomeIcon
              icon={faChartLine}
              className="logo"
            ></FontAwesomeIcon>{" "}
            Trackerie
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Link to="/" className="nav-link">
              <FontAwesomeIcon icon={faStream} className="nav-link-icon" />
              Exercises
            </Link>
            <Link to="/create" className="nav-link">
              <FontAwesomeIcon icon={faRunning} className="nav-link-icon" />
              New Exercise
            </Link>
            <Link to="/user" className="nav-link">
              <FontAwesomeIcon icon={faUsers} className="nav-link-icon" />
              New User
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
