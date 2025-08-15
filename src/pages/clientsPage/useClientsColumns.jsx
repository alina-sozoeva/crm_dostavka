import {
  CalendarOutlined,
  CheckSquareFilled,
  CloseOutlined,
  EditOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Flex } from "antd";
import styles from "./ClientsPage.module.scss";
import clsx from "clsx";
import dayjs from "dayjs";

export const useClientsColumns = () => {
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
      key: "email",
      dataIndex: "email",
      title: "Email",
    },
    {
      key: "date_system",
      dataIndex: "date_system",
      title: "Дата регистрации",
      render: (_, record, index) =>
        dayjs(record.date_system).format("DD.MM.YYYY HH:MM"),
      sorter: (a, b) => new Date(a.date_system) - new Date(b.date_system),
    },
    {
      key: "id",
      dataIndex: "id",
      title: "...",
      width: 100,
      align: "center",
      render: () => (
        <Flex gap="middle" className={clsx(styles.actions)}>
          <span>
            <EditOutlined />
          </span>
          <CloseOutlined className={clsx("text-red-500")} />
        </Flex>
      ),
    },
  ];

  return { columns };
};
