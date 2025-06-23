import { useState } from "react";
import {
  BarChartOutlined,
  BellFilled,
  EnvironmentFilled,
  HomeFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  StarFilled,
  StockOutlined,
  TeamOutlined,
  TruckFilled,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { Button, Flex, Layout, Menu } from "antd";
import clsx from "clsx";
import { Link, Outlet, useLocation } from "react-router-dom";
import * as CustomHeader from "../Header";
import styles from "./MainLayout.module.scss";
import { pageName, pathName } from "../../enums";

const { Header, Sider, Content } = Layout;
export const MainLayout = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const title = (() => {
    switch (location.pathname) {
      case pathName.home:
        return pageName.home;
      case pathName.orders:
        return pageName.orders;
      case pathName.notifications:
        return pageName.notifications;
      case pathName.tracking:
        return pageName.tracking;
      case pathName.reviews:
        return pageName.reviews;
      case pathName.analytics:
        return pageName.analytics;
      case pathName.couriers:
        return pageName.couriers;
      case pathName.blackList:
        return pageName.blackList;
      default:
        return pageName.home;
    }
  })();

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
              icon: <StockOutlined />,
              label: <Link to={pathName.home}>Logistic Solutions</Link>,
            },
            {
              key: "1",
              icon: <HomeFilled />,
              label: <Link to={pathName.home}>{pageName.home}</Link>,
            },
            {
              key: "2",
              icon: <TruckFilled />,
              label: <Link to={pathName.orders}>{pageName.orders}</Link>,
            },
            {
              key: "3",
              icon: <TeamOutlined />,
              label: <Link to={pathName.couriers}>{pageName.couriers}</Link>,
            },
            {
              key: "4",
              icon: <BellFilled />,
              label: (
                <Link to={pathName.notifications}>
                  {pageName.notifications}
                </Link>
              ),
            },
            {
              key: "5",
              icon: <EnvironmentFilled />,
              label: <Link to={pathName.tracking}>{pageName.tracking}</Link>,
            },
            {
              key: "6",
              icon: <StarFilled />,
              label: <Link to={pathName.reviews}>{pageName.reviews}</Link>,
            },
            {
              key: "7",
              icon: <BarChartOutlined />,
              label: <Link to={pathName.analytics}>{pageName.analytics}</Link>,
            },
            {
              key: "8",
              icon: <UserDeleteOutlined />,
              label: <Link to={pathName.blackList}>{pageName.blackList}</Link>,
            },
          ]}
        />
      </Sider>

      <Layout>
        <>
          <Header className={clsx(styles.header)}>
            <Flex justify="space-between">
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                className={clsx(styles.btn)}
              />
              <CustomHeader.Header />
            </Flex>
          </Header>
          <h1 className={clsx(styles.title, "text-2xl")}>{title}</h1>
        </>

        <Content className={clsx(styles.constent)}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
