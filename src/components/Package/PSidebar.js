import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  Layout, Menu } from 'antd';
const { Sider, Content } = Layout;

const PSidebar = () => {
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
          height: '100vh',
          left: 0,
          background: '#D9D9D9'
        }}
      >
        <div className="demo-logo-vertical" />
        <div
          style={{
            marginTop: 60,
            height: 64,
            borderBottom: '1px solid #555',
            textAlign: 'center',
            lineHeight: '64px',
            color: '#000', 
            fontSize: 18, 
          }}
        >
          Package Management
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={[]}
          style={{ marginTop: 60, background:'#D9D9D9', fontWeight:'bold'}}
          inlineIndent={20}
        >
          <Menu.Item key="1" onClick={() => handleMenuClick('/pdashboard')} style={{  fontSize:'18px' }}>
            Home
          </Menu.Item>
          <Menu.Item key="2" onClick={() => handleMenuClick('/create')} style={{  fontSize:'18px' }}>
            Create Package
          </Menu.Item>
          <Menu.Item key="3" onClick={() => handleMenuClick('/pintfc')} style={{  fontSize:'18px' }}>
            Packages
          </Menu.Item>
          <Menu.Item key="4" onClick={() => handleMenuClick('/preport')} style={{fontSize:'18px' }}>
            Report
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        
        <Content></Content>
      </Layout>
    </Layout>
  );
};

export default PSidebar;
