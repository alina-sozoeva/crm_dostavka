import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import styles from "./CourierPage.module.scss";
import clsx from "clsx";

export const useCourierColumns = ({ onUpdate }) => {
  const columns = [
    {
      key: "guid",
      dataIndex: "guid",
      title: "№",
      align: "center",
      width: 30,
      render: (_, __, index) => {
        return index + 1;
      },
    },
    {
      key: "nameid",
      dataIndex: "nameid",
      title: "ФИО",
    },
    {
      key: "phone",
      dataIndex: "phone",
      title: "Телефон",
    },
    {
      key: "login",
      dataIndex: "login",
      title: "Логин",
    },
    {
      key: "password",
      dataIndex: "password",
      title: "Пароль",
    },
    {
      key: "id",
      dataIndex: "id",
      title: "...",
      width: 80,
      align: "center",
      render: (_, record) => (
        <Flex gap="middle" className={clsx(styles.actions)}>
          <span onClick={() => onUpdate(record.codeid)}>
            <EditOutlined />
          </span>
          <CloseOutlined className={clsx("text-red-500")} />
        </Flex>
      ),
    },
  ];

  return { columns };
};
