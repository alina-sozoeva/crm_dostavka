import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import clsx from "clsx";
import styles from "./CancelOrdersPage.module.scss";
import { CloseOutlined } from "@ant-design/icons";

dayjs.extend(utc);

export const useCancelOrdersColumns = ({ onOpenWarnModal }) => {
  const columns = [
    {
      key: "guid",
      dataIndex: "guid",
      title: "№ заказа",
      width: 100,
      align: "center",
      render: (_, __, idx) => <span>{idx + 1}</span>,
    },
    {
      key: "nameid_user_update",
      dataIndex: "nameid_user_update",
      title: "Оператор",
      render: (_, item) => <span>{item.nameid_user_update}</span>,
    },
    {
      key: "cancel_comment",
      dataIndex: "cancel_comment",
      title: "Комментарий",
      render: (_, item) => <span>{item.cancel_comment}</span>,
    },
    {
      key: "fio_from",
      dataIndex: "fio_from",
      title: "Отправитель",
      render: (_, item) => <span>{item.fio_from}</span>,
    },
    {
      key: "from_to",
      dataIndex: "from_to",
      title: "Адрес отправителя",
      render: (_, record) => (
        <span>
          {record.nameid_oblasty_from} обл., {record.nameid_city_from},{" "}
          {record.address_from}
        </span>
      ),

      onFilter: (value, record) => record.from.startsWith(value),
    },
    {
      key: "phone_from",
      dataIndex: "phone_from",
      title: "Tелефон отправителя",
      render: (_, record) => <span>{record.phone_from}</span>,
    },
    {
      key: "delivery_to_time",
      dataIndex: "delivery_to_time",
      title: "Дата/время",
      render: (text) => (
        <span>{dayjs.utc(text).format("DD.MM.YYYY HH:mm")}</span>
      ),
      sorter: (a, b) =>
        new Date(a.delivery_to_time) - new Date(b.delivery_to_time),
    },
    {
      key: "actions",
      dataIndex: "actions",
      title: "...",
      width: 150,
      align: "center",
      render: (_, record) => {
        if (record.status === 7) {
          return (
            <span
              className={styles.remove}
              onClick={() => onOpenWarnModal(record?.guid)}
            >
              <CloseOutlined /> Удалить
            </span>
          );
        }
      },
    },
  ];

  return { columns };
};
