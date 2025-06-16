import { Dropdown, Flex, Space } from "antd";
import {
  CaretDownOutlined,
  LogoutOutlined,
  QuestionCircleFilled,
} from "@ant-design/icons";
import styles from "./Header.module.scss";
import clsx from "clsx";

const items = [
  {
    label: (
      <a
        href="https://www.antgroup.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Username
      </a>
    ),
    key: "0",
  },

  {
    type: "divider",
  },
  {
    label: (
      <Space>
        Выйти <LogoutOutlined rotate={270} />
      </Space>
    ),
    key: "3",
  },
];

export const Header = () => {
  return (
    <header className={clsx(styles.header, "pr-6")}>
      <Flex align="center" justify="center" gap="large">
        <div>
          <QuestionCircleFilled /> <span>Вопросы</span>
        </div>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <div onClick={(e) => e.preventDefault()}>
            <Space>
              <button className={clsx(styles.btn)}>U</button>
              <Flex vertical gap={4}>
                <p className={clsx(styles.user_info)}>User@gmail.com</p>
              </Flex>
              <CaretDownOutlined />
            </Space>
          </div>
        </Dropdown>
      </Flex>
    </header>
  );
};
