import { Flex, Tooltip } from "antd";

import styles from "./ApplicationsPage.module.scss";
import clsx from "clsx";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { EditOutlined } from "@ant-design/icons";
import { FaRegTrashAlt } from "react-icons/fa";
import { order_status } from "../../enums";

dayjs.extend(utc);

export const useApplicationsColumns = ({
  onUpdate,
  onOpenWarnModal,
  userPos,
}) => {
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
      title: "Контактное лицо",
      width: 150,
    },
    {
      key: "operator_name",
      dataIndex: "operator_name",
      title: "Оператор",
      width: 100,
    },
    {
      key: "phone",
      dataIndex: "phone",
      title: "Телефон",
      width: 130,
    },
    {
      key: "address_to",
      dataIndex: "address_to",
      title: "Адрес Забора",
      width: 200,
    },
    {
      key: "courier_name",
      dataIndex: "courier_name",
      title: "Курьер",
      width: 120,
    },
    {
      key: "courier_phone",
      dataIndex: "courier_phone",
      title: "Телефона курьера",
      width: 130,
    },
    {
      key: "status",
      dataIndex: "status",
      title: "Статус",
      width: 120,
      render: (_, record) => <span>{order_status[record?.status]}</span>,
    },
    {
      key: "date_system",
      dataIndex: "date_system",
      title: "Дата создания",
      align: "center",
      width: 120,
      render: (_, record, index) =>
        dayjs.utc(record.date_system).format("DD.MM.YYYY HH:mm"),
    },
    {
      key: "planned_date",
      dataIndex: "planned_date",
      title: "Дата заявки",
      align: "center",
      width: 100,
      render: (_, record, index) =>
        record.planned_date
          ? dayjs.utc(record.planned_date).format("DD.MM.YYYY")
          : "-",
    },
    {
      key: "comment",
      dataIndex: "comment",
      title: "Примечание",
      width: 250,
    },
    {
      key: "guid",
      dataIndex: "guid",
      title: "...",
      width: 50,
      align: "center",
      render: (_, record) => (
        <Flex
          align="center"
          justify="center"
          gap="middle"
          className={clsx(styles.actions)}
        >
          <Tooltip title="Редактировать заказ">
            <EditOutlined
              onClick={() => onUpdate(record)}
              className={clsx("text-blue-600 cursor-pointer")}
            />
          </Tooltip>

          {(userPos !== 3 || (userPos === 3 && record?.status === 3)) && (
            <Tooltip title="Удалить заказ">
              <FaRegTrashAlt
                onClick={() => onOpenWarnModal(record)}
                className={clsx("text-red-600 cursor-pointer")}
              />
            </Tooltip>
          )}
        </Flex>
      ),
    },
  ];

  return { columns };
};
