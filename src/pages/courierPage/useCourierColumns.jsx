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
      key: "id",
      dataIndex: "id",
      title: "№",
      align: "center",
      width: 30,
      render: (index) => {
        return index++;
      },
    },
    {
      key: "fio",
      dataIndex: "fio",
      title: "ФИО",
    },
    {
      key: "order",
      dataIndex: "order",
      title: "Заказ",
    },
    {
      key: "office",
      dataIndex: "office",
      title: "В офис",
    },
    {
      key: "delivery",
      dataIndex: "delivery",
      title: "Доставка",
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
