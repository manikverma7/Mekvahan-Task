import React, { useState, useEffect } from "react";
import cookie from "react-cookies";
import "antd/dist/antd.css";
import "./profile.css";
import { Redirect } from "@reach/router";
import { Layout, Menu, Avatar, Button } from "antd";

import Popup from "../Popup/Popup";
import Address from "../Address/Address";

function Profile(props) {
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const [addresses, setAddresses] = useState([]);

  function addAddress(newAddress) {
    setAddresses((prevAddresses) => {
      return [...prevAddresses, newAddress];
    });
  }

  function deleteAddress(id) {
    setAddresses((prevAddresses) => {
      return prevAddresses.filter((AddressItem, index) => {
        return index !== id;
      });
    });
  }

  useEffect(() => {
    if (cookie.load("status")) {
      console.log("Is Logged In");
    } else {
      setIsLoggedOut(true);
    }
  }, []);

  function logout() {
    cookie.remove("status");
    setIsLoggedOut(true);
  }
  if (isLoggedOut) {
    return <Redirect to="/" noThrow />;
  }
  const { Header, Content, Footer, Sider } = Layout;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider className="side-bar">
        <div className="logo">
          <Avatar
            size={64}
            src={require("../../images/dp.png")}
            alt="display picture"
          />
          <h1 className="logo-heading">Hi Mekvahan!</h1>
        </div>
        <Menu theme="light" defaultSelectedKeys={["2"]} mode="inline">
          <Menu.Item key="1" className="menu-item">
            My Profile
          </Menu.Item>
          <Menu.Item key="2" className="menu-item">
            Manage Address
          </Menu.Item>
          <Menu.Item key="3" className="menu-item">
            Change Password
          </Menu.Item>
          <Button onClick={logout} className="logout-button">
            Log Out
          </Button>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background header">
          <h2 className="myAddress">My Addresses</h2>
          <Popup onAdd={addAddress} />
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <div className="site-layout-background content">
            {addresses.length > 0 ? null : (
              <img
                src={require("../../images/address.png")}
                alt="No Address found "
              />
            )}

            {addresses.map((addressItem, index) => {
              return (
                <Address
                  key={index}
                  id={index}
                  place={addressItem.place}
                  content={addressItem.content}
                  onDelete={deleteAddress}
                />
              );
            })}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Mekvahan ©2020 Created by Manik Verma
        </Footer>
      </Layout>
    </Layout>
  );
}

export default Profile;
