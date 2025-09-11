import { useEffect, useMemo, useState } from "react";
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
import { useGetApplicationsQuery, useGetOrdersQuery } from "../../store";
import styles from "./MainLayout.module.scss";
import * as CustomHeader from "../Header";
import clsx from "clsx";
import { RiEBike2Fill } from "react-icons/ri";
import { LuFilePen } from "react-icons/lu";
import { useSelector } from "react-redux";
import { MdOutlineHeadsetMic, MdOutlineSupportAgent } from "react-icons/md";

const { Header, Sider, Content } = Layout;
export const MainLayout = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [prevLength, setPrevLength] = useState(0);
  const [bellColor, setBellColor] = useState("");
  const { data } = useGetOrdersQuery({});
  const { data: apps } = useGetApplicationsQuery({});
  const userId = useSelector((state) => state.user.userId);

  const filteredData = useMemo(() => {
    return data?.data?.filter((item) => item.status === 1 || item.status === 8);
  }, [data]);

  useEffect(() => {
    if (filteredData?.length > prevLength) {
      setBellColor("green");
    } else {
      setBellColor("");
    }

    setPrevLength(filteredData?.length || 0);
  }, [filteredData?.length, prevLength]);

  console.log(apps?.data?.length);

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
      case pathName.applications:
        return pageName.applications;
      default:
        return pageName.home;
    }
  })();

  const menuItems = useMemo(() => {
    if (userId === "9") {
      return [
        {
          key: "0",
          icon: <StockOutlined />,
          label: <Link to={pathName.home}>Pony Express</Link>,
        },
        {
          key: pathName.applications,
          icon: <LuFilePen />,
          label: (
            <Link to={pathName.applications}>{pageName.applications}</Link>
          ),
        },
      ];
    }

    return [
      {
        key: "0",
        icon: <StockOutlined />,
        label: <Link to={pathName.home}>Pony Express</Link>,
      },
      {
        key: pathName.home,
        icon: <HomeFilled />,
        label: <Link to={pathName.home}>{pageName.home}</Link>,
      },
      {
        key: pathName.orders,
        icon: <TruckFilled />,
        label: <Link to={pathName.orders}>{pageName.orders}</Link>,
      },
      {
        key: pathName.couriers,
        icon: <RiEBike2Fill />,
        label: <Link to={pathName.couriers}>{pageName.couriers}</Link>,
      },
      {
        key: pathName.clients,
        icon: <TeamOutlined />,
        label: <Link to={pathName.clients}>{pageName.clients}</Link>,
      },
      {
        key: pathName.operators,
        icon: <MdOutlineHeadsetMic />,
        label: <Link to={pathName.operators}>{pageName.operators}</Link>,
      },
      {
        key: pathName.notifications,
        icon: <BellFilled style={{ color: bellColor }} />,

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
        key: pathName.tracking,
        icon: <EnvironmentFilled />,
        label: <Link to={pathName.tracking}>{pageName.tracking}</Link>,
      },
      {
        key: pathName.cancelOders,
        icon: <InfoCircleOutlined />,
        label: <Link to={pathName.cancelOders}>{pageName.cancelOders}</Link>,
      },
      {
        key: pathName.applications,
        icon: <LuFilePen />,
        label: (
          <Link to={pathName.applications}>
            <Flex justify="space-between">
              <span>{pageName.applications}</span>
              <span>{apps?.data?.length}</span>
            </Flex>
          </Link>
        ),
      },
    ];
  }, [userId, bellColor, filteredData?.length, apps?.data?.length]);

  return (
    <Layout className={clsx("h-screen")}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={menuItems}
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
