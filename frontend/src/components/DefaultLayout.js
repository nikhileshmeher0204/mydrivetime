import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

function DefaultLayout(props) {
  // Determine if current route is Home (assuming Home is served at "/")
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  // If not Home, set scrolled = true by default
  const [scrolled, setScrolled] = useState(!isHomePage);

  useEffect(() => {
    // If on Home page, manage scrolled class based on scroll
    if (isHomePage) {
      const handleScroll = () => {
        setScrolled(window.scrollY > 50);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isHomePage]);

  if (!user) {
    return <div>Please login to continue</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="layout-container">
      <Navbar
        expand="lg"
        className={`navbar-transparent fixed-top ${scrolled ? "scrolled" : ""}`}
      >
        <Container>
          <Navbar.Brand>
            <Link
              to={user.role === "admin" ? "/admin" : "/"}
              className="brand-link"
            >
              mydrivetime
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link
                as={Link}
                to={user.role === "admin" ? "/admin" : "/"}
                className="nav-link-light"
              >
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/userbookings" className="nav-link-light">
                Bookings
              </Nav.Link>
              <Nav.Link onClick={handleLogout} className="nav-link-light">
                Logout ({user.username})
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className={`main-content ${isHomePage ? "home-page" : ""}`}>
        {props.children}
      </div>
    </div>
  );
}

export default DefaultLayout;
