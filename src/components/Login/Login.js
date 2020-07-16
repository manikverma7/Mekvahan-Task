import React, { useState } from "react";
import Loader from "../Loader/Loader";
import cookie from "react-cookies";
import "antd/dist/antd.css";
import "./Login.css";
import { Link, Redirect } from "@reach/router";
import { Typography } from "antd";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = (props) => {
  const [mobile, updateMobile] = useState("");
  const [password, updatePassword] = useState("");
  const [isLoggedIn, updateIsLoggedIn] = useState(false);
  const [loader, updateLoader] = useState(false);

  function login() {
    updateLoader(true);
    fetch("https://mekvahan.com/api/android_intern_task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobile,
        password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.status) {
          cookie.save("status", res.status);
          updateIsLoggedIn(true);
        } else {
          toast.error("Wrong Mobile Number/PassWord", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
          });
        }
      })
      .catch((err) => {
        console.log(`Error while login ${err}`);
      })
      .finally(() => {
        updateLoader(false);
      });
  }

  if (isLoggedIn) {
    return <Redirect to="profile" noThrow />;
  }
  if (cookie.load("status")) {
    return <Redirect to="profile" noThrow />;
  }

  const { Text } = Typography;
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="login-background">
      <ToastContainer />
      <Loader loader={loader} />
      <div className="login-container">
        <img
          src={require("../../images/car.png")}
          alt="Car"
          className="login-image"
        />
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <div className="logo">
            <img
              src={require("../../images/logo.png")}
              alt="logo"
              className="logo-img"
            />
            <h1 className="logo-text">Mekvahan</h1>
          </div>

          <Form.Item
            name="mobile"
            rules={[
              {
                required: true,
                message: "Please input your Mobile number!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              className="form-username"
              placeholder="10 digit mobile number"
              onChange={(txt) => updateMobile(txt.target.value)}
              value={mobile}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              className="form-username"
              onChange={(txt) => updatePassword(txt.target.value)}
              value={password}
            />
          </Form.Item>
          <Form.Item>
            <a className="login-form-forgot" href="#">
              Forgot password?
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button button"
              onClick={() => login()}
            >
              Login
            </Button>
            <Text type="secondary" className="register">
              Don't have an account? &nbsp;
              <Link to="/" className="form--signup">
                Sign Up now!
              </Link>
            </Text>
            <Text type="secondary" className="register-or">
              Or
            </Text>
            <Text type="secondary" className="register">
              continue with
            </Text>
          </Form.Item>
          <Form.Item className="icons-list">
            <img
              src={require("../../images/fb.png")}
              className="icons-list-logo"
              alt="Fb Login Icon"
            ></img>
            <img
              src={require("../../images/google.png")}
              className="icons-list-logo"
              alt="Google Login Icon"
            ></img>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
