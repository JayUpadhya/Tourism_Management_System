import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
const { Sider, Content } = Layout;

const PUSidebar = () => {
  const navigate = useNavigate();
  const [collapsed] = useState(false);

  const handleMenuClick = (path) => {
    navigate(path);
  };

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          height: "100vh",
          left: 0,
          background: "#b2b2b2",
        }}
      >
        <div className="demo-logo-vertical" />

        <Menu
          mode="inline"
          defaultSelectedKeys={[]}
          style={{ marginTop: 60, background: "#b2b2b2", fontWeight: "bold" }}
          inlineIndent={20}
        >
          <Menu.Item
            key="2"
            onClick={() => handleMenuClick("/ucus")}
            style={{ fontSize: "18px" }}
          >
            Customize
          </Menu.Item>
          <Menu.Item
            key="3"
            onClick={() => handleMenuClick("/udashboard")}
            style={{ fontSize: "18px" }}
          >
            Own Packages
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content></Content>
      </Layout>
    </Layout>
  );
};

export default PUSidebar;
