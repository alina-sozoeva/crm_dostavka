import { Flex } from "antd";
import styles from "./Header.module.scss";
import clsx from "clsx";
import { Link } from "react-router-dom";
import {
  AreaChartOutlined,
  HomeOutlined,
  LogoutOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";

export const Header = () => {
  return (
    <header className={clsx(styles.header)}>
      <Flex justify="space-between">
        <Flex gap="middle">
          <Link to="/">
            <HomeOutlined /> Главная
          </Link>
          <Link to="/">
            <SettingOutlined /> Настройки
          </Link>
          <Link to="/">
            <AreaChartOutlined /> Отчет
          </Link>
          <Link to="/">
            <UsergroupAddOutlined /> Курьеры
          </Link>
        </Flex>
        <Flex gap="middle">
          <Flex>
            <UserOutlined /> User
          </Flex>
          <LogoutOutlined rotate={270} />
        </Flex>
      </Flex>
    </header>
  );
};
