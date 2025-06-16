import React, { useState } from "react";
import {
  BarChartOutlined,
  BellFilled,
  EnvironmentFilled,
  HomeFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  StarFilled,
  TruckFilled,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Flex, Layout, Menu, theme } from "antd";
import clsx from "clsx";
import { Link, Outlet } from "react-router-dom";
import * as CustomHeader from "../Header";

const { Header, Sider, Content } = Layout;
export const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className={clsx("h-screen")}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "0",
              label: "LOGO",
            },
            {
              key: "1",
              icon: <HomeFilled />,
              label: <Link to="/">Главная</Link>,
            },
            {
              key: "2",
              icon: <TruckFilled />,
              label: <Link to="/">Заказы</Link>,
            },
            {
              key: "3",
              icon: <BellFilled />,
              label: <Link to="/">Уведомления</Link>,
            },
            {
              key: "4",
              icon: <EnvironmentFilled />,
              label: <Link to="/">Треккинг</Link>,
            },
            {
              key: "5",
              icon: <StarFilled />,
              label: <Link to="/">Отзывы</Link>,
            },
            {
              key: "6",
              icon: <BarChartOutlined />,
              label: <Link to="/">Аналитика</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Flex justify="space-between">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <CustomHeader.Header />
          </Flex>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
