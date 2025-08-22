import { EditOutlined } from "@ant-design/icons";
import { Flex, Tooltip } from "antd";
import styles from "./ClientsPage.module.scss";
import clsx from "clsx";
import dayjs from "dayjs";
import { FaRegTrashAlt } from "react-icons/fa";

export const useClientsColumns = ({ onOpenWarnModal }) => {
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
          <Tooltip title="Редактировать заказ">
            <EditOutlined className={clsx("text-blue-600 cursor-pointer")} />
          </Tooltip>

          <Tooltip title="Удалить заказ">
            <FaRegTrashAlt
              onClick={() => onOpenWarnModal()}
              className={clsx("text-red-600 cursor-pointer")}
            />
          </Tooltip>
        </Flex>
      ),
    },
  ];

  return { columns };
};
