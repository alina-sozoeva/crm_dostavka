import { Flex, Tooltip } from "antd";

import styles from "./ApplicationsPage.module.scss";
import clsx from "clsx";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { EditOutlined } from "@ant-design/icons";
import { FaRegTrashAlt } from "react-icons/fa";
import { order_status } from "../../enums";

dayjs.extend(utc);

export const useApplicationsColumns = ({ onUpdate, onOpenWarnModal }) => {
  const columns = [
    {
      key: "guid",
      dataIndex: "guid",
      title: "№",
      width: 50,
      align: "center",
      render: (_, __, idx) => <span>{idx + 1}</span>,
    },
    {
      key: "nameid",
      dataIndex: "nameid",
      title: "Наименование/ФИО",
    },
    {
      key: "phone",
      dataIndex: "phone",
      title: "Телефон получателя",
    },
    {
      key: "address_to",
      dataIndex: "address_to",
      title: "Куда",
    },
    {
      key: "courier_name",
      dataIndex: "courier_name",
      title: "Курьер",
    },
    {
      key: "courier_phone",
      dataIndex: "courier_phone",
      title: "Телефона курьера",
    },
    {
      key: "status",
      dataIndex: "status",
      title: "Статус",
      width: 150,
      render: (_, record) => <span>{order_status[record?.status]}</span>,
    },
    {
      key: "date_system",
      dataIndex: "date_system",
      title: "Дата/время",
      render: (_, record, index) =>
        dayjs.utc(record.date_system).format("DD.MM.YYYY HH:mm"),
      sorter: (a, b) => new Date(a.date_system) - new Date(b.date_system),
    },
    {
      key: "guid",
      dataIndex: "guid",
      title: "...",
      width: 80,
      align: "center",
      render: (_, record) => (
        <Flex gap="middle" className={clsx(styles.actions)}>
          <Tooltip title="Редактировать заказ">
            <EditOutlined
              onClick={() => onUpdate(record)}
              className={clsx("text-blue-600 cursor-pointer")}
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
