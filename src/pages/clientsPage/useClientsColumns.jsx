import { EditOutlined } from "@ant-design/icons";
import { Flex, Tooltip } from "antd";
import { FaRegTrashAlt } from "react-icons/fa";
import styles from "./ClientsPage.module.scss";
import clsx from "clsx";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const useClientsColumns = ({ onOpenWarnModal, onOpenEditModal }) => {
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
        dayjs.utc(record.date_system).format("DD.MM.YYYY HH:mm"),
      sorter: (a, b) => new Date(a.date_system) - new Date(b.date_system),
    },
    {
      key: "id",
      dataIndex: "id",
      title: "...",
      width: 100,
      align: "center",
      render: (_, record) => (
        <Flex gap="middle" className={clsx(styles.actions)}>
          <Tooltip title="Редактировать заказ">
            <EditOutlined
              className={clsx("text-blue-600 cursor-pointer")}
              onClick={() => onOpenEditModal(record)}
            />
          </Tooltip>

          <Tooltip title="Удалить заказ">
            <FaRegTrashAlt
              onClick={() => onOpenWarnModal(record)}
              className={clsx("text-red-600 cursor-pointer")}
            />
          </Tooltip>
        </Flex>
      ),
    },
  ];

  return { columns };
};
