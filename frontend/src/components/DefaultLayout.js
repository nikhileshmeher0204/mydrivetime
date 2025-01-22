import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

function DefaultLayout(props) {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  if (!user) {
    return <div>Please login to continue</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div>
      <Navbar bg="light" expand="lg" className="bs1">
        <Container>
          <Navbar.Brand>
            <Link to="/" style={{ color: "orangered" }}>
              mydrivetime
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to={user.role === "admin" ? "/admin" : "/"}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/userbookings">
                Bookings
              </Nav.Link>
              <Nav.Link onClick={handleLogout}>
                Logout ({user.username})
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="content">{props.children}</div>
    </div>
  );
}

export default DefaultLayout;