import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to={"/"}>Home</Link>
          </Nav>
          <Nav className="me-auto">
            <Link to={"/show-all"}>Show All</Link>
          </Nav>
          <Nav className="me-auto">
            <Link to={"/search"}>Search</Link>
          </Nav>
          <Nav className="me-auto">
            <Link to={"/sort"}>Sort</Link>
          </Nav>
          <Nav className="me-auto">
            <Link to={"/filter"}>Filter</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default React.memo(Header);
