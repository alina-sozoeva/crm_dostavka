import { useMemo, useState } from "react";
import {
  BellFilled,
  EnvironmentFilled,
  HomeFilled,
  InfoCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  StockOutlined,
  TeamOutlined,
  TruckFilled,
} from "@ant-design/icons";
import { Button, Flex, Layout, Menu } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import { pageName, pathName } from "../../enums";
import { useGetOrdersQuery } from "../../store";
import styles from "./MainLayout.module.scss";
import * as CustomHeader from "../Header";
import clsx from "clsx";
import { RiEBike2Fill } from "react-icons/ri";

const { Header, Sider, Content } = Layout;
export const MainLayout = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const { data } = useGetOrdersQuery({});

  const filteredData = useMemo(() => {
    return data?.data?.filter((item) => item.status === 1);
  }, [data]);

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
      case pathName.cancelOders:
        return pageName.cancelOders;
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
              icon: <RiEBike2Fill />,
              label: <Link to={pathName.couriers}>{pageName.couriers}</Link>,
            },
            {
              key: "4",
              icon: <BellFilled />,
              label: (
                <Link to={pathName.notifications}>
                  <Flex justify="space-between">
                    <span>{pageName.notifications}</span>
                    <span>{filteredData?.length}</span>
                  </Flex>
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
              icon: <InfoCircleOutlined />,
              label: (
                <Link to={pathName.cancelOders}>{pageName.cancelOders}</Link>
              ),
            },
            {
              key: "7",
              icon: <TeamOutlined />,
              label: <Link to={pathName.clients}>{pageName.clients}</Link>,
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
