import {
  CalendarOutlined,
  CheckSquareFilled,
  CloseOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Flex } from "antd";
import styles from "./CourierPage.module.scss";
import clsx from "clsx";

export const useCourierColumns = () => {
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
      key: "nameid_sp_filial",
      dataIndex: "nameid_sp_filial",
      title: "Филиал",
    },
    {
      key: "phone",
      dataIndex: "phone",
      title: "Телефон",
    },
    {
      key: "delivery",
      dataIndex: "delivery",
      title: "Доставка",
      render: (_, __, index) => {
        return index + 2;
      },
    },
    {
      key: "id",
      dataIndex: "id",
      title: "...",
      width: 120,
      align: "center",
      render: () => (
        <Flex gap="middle" className={clsx(styles.actions)}>
          <CloseOutlined className={clsx("text-red-500")} />
          <MessageOutlined />
          <CalendarOutlined />
          <CheckSquareFilled className={clsx("text-blue-500")} />
        </Flex>
      ),
    },
  ];

  return { columns };
};
