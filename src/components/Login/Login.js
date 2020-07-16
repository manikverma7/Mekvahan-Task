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
  //States For Reading the Inputs by the User
  const [mobile, updateMobile] = useState("");
  const [password, updatePassword] = useState("");

  //States for Redirecting the Login Page to the Users Profile
  const [isLoggedIn, updateIsLoggedIn] = useState(false);

  //State For Running a loader
  const [loader, updateLoader] = useState(false);

  const { Text } = Typography;

  //Function called when the user clicks on the login button
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
          cookie.save("status", res.status); //Stores the status(true) in the browser's cookie.
          updateIsLoggedIn(true);
        } else {
          toast.error("Wrong Mobile Number/PassWord", {
            //Toaster runs the user enters wrong login credentials
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
        updateLoader(false); //State of the loader changes to false when the post request is completed
      });
  }

  //Checks for redirecting  to user profile when the login state is true
  if (isLoggedIn) {
    return <Redirect to="profile" noThrow />;
  }
  //Checks for redirecting to user profile when status is still stored in the cookie
  if (cookie.load("status")) {
    return <Redirect to="profile" noThrow />;
  }

  return (
    <div className="login-background">
      <ToastContainer />
      <Loader loader={loader} /> {/* Sending the state of loader as a prop*/}
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
