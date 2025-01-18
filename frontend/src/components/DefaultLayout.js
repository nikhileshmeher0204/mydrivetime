import React from "react";
import { Menu, Dropdown, Button, Space , Row , Col } from "antd";
import {Link} from 'react-router-dom'

function DefaultLayout(props) {
    const user = JSON.parse(localStorage.getItem('user'))
  const menu = (
    <Menu>
      <Menu.Item onClick={()=>{
          localStorage.removeItem('user');
          window.location.href='/login'
      }}>
          <li style={{color:'orangered'}}>Logout</li>
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      <div className="header bs1">
        <Row gutter={16} justify="center">
          <Col lg={20} sm={24} xs={24}>
            <div className="d-flex justify-content-between align-items-center">
              <h1>
                <b>
                  <Link to="/" style={{ color: "orangered" }}>
                    mydrivetime
                  </Link>
                </b>
              </h1>
              <div>
              {user.role === "admin" ? (
                  <Link to="/admin" style={{ marginRight: 20 }}>
                    Home
                  </Link>
                ) : (
                  <Link to="/" style={{ marginRight: 20 }}>
                    Home
                  </Link>
                )}
                <Link to="/userbookings" style={{ marginRight: 20 }}>
                  Bookings
                </Link>
                <Dropdown overlay={menu} placement="bottomCenter">
                  <Button>{user.username}</Button>
                </Dropdown>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="content">{props.children}</div>
      <div className="footer text-center">
        <hr />
        <p>Car Rental ©2023</p>
      </div>
    </div>
  );
}

export default DefaultLayout;
