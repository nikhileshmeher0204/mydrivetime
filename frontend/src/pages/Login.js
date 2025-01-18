import React from "react";
import { Row, Col, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/actions/userActions";
import AOS from "aos";
import Spinner from "../components/Spinner";
import "aos/dist/aos.css"; // You can also use <link> for styles

// ...

AOS.init();

function Login() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  
  function onFinish(values) {
    dispatch(userLogin(values));
    console.log(values);
  }

  return (
    <div className="login">
      <div className="login-background"></div>
      {loading && <Spinner />}
      <Row gutter={16} className="d-flex align-items-center h-100">
        <Col lg={16} style={{ position: "relative" }}>
          <h1
            className="login-logo"
            style={{ position: "absolute", top: 0, left: 0 }}
          >
            mydrivetime
          </h1>
        </Col>
        <Col lg={8} className="text-left p-5">
          <Form
            layout="vertical"
            className="login-form p-5"
            onFinish={onFinish}
          >
            <h1>Login</h1>
            <hr />
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true }]}
            >
              <Input type="password" />
            </Form.Item>

            <button className="btn1 mt-2">Login</button>

            <hr />

            <Link to="/register">Click Here to Register</Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
