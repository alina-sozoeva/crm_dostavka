import { Dropdown, Flex, Space } from "antd";
import {
  CaretDownOutlined,
  LogoutOutlined,
  QuestionCircleFilled,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { removeToken, useGetUsersQuery } from "../../store";
import logo_pony from "../../assets/images/logo_pony.png";
import styles from "./Header.module.scss";
import clsx from "clsx";

export const Header = () => {
  const dispatch = useDispatch();
  const { data } = useGetUsersQuery({});

  const logOut = () => {
    dispatch(removeToken());
  };

  const userId = useSelector((state) => state.user.userId);

  const user = data?.data.find((item) => item.codeid === userId);

  const items = [
    {
      label: <p>{user?.login}</p>,
      key: "0",
    },

    {
      type: "divider",
    },
    {
      label: (
        <Space onClick={logOut}>
          Выйти <LogoutOutlined rotate={270} />
        </Space>
      ),
      key: "3",
    },
  ];
  return (
    <header className={clsx(styles.header, "pr-6")}>
      <Flex align="center" justify="center" gap="large">
        <Dropdown menu={{ items }} trigger={["click"]}>
          <div onClick={(e) => e.preventDefault()}>
            <Space>
              <button className={clsx(styles.btn)}>U</button>
              <Flex vertical gap={4}>
                <p className={clsx(styles.user_info)}>{user?.login}</p>
              </Flex>
              <CaretDownOutlined />
            </Space>
          </div>
        </Dropdown>
      </Flex>
    </header>
  );
};
