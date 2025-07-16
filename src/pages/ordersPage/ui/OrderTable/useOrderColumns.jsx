import { Select } from "antd";
import { useMemo } from "react";
import { useGetUsersQuery } from "../../../../store";
import styles from "./OrderTable.module.scss";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
import clsx from "clsx";
import { CloseOutlined, WarningOutlined } from "@ant-design/icons";

dayjs.extend(utc);

export const useOrderColumns = ({
  filteredUsers,
  onOpenCancelModal,
  onUpdateStatus,
  onOpenWarnModal,
  bg_color,
  color,
}) => {
  const { data } = useGetUsersQuery();

  const couriers = useMemo(() => {
    return data?.data?.filter((item) => item.code_sp_user_position === 2) || [];
  }, [data]);

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
      key: "fio_from_to",
      dataIndex: "fio_from_to",
      title: "Отправителя/получатель",
      render: (_, record) => (
        <span className={color(Number(record.status))}>
          {record.fio_from}/{record.fio_to}
        </span>
      ),
    },
    {
      key: "phone_from",
      dataIndex: "phone_from",
      title: "Tелефон отправителя",
      render: (_, record) => (
        <span className={color(Number(record.status))}>
          {record.phone_from}
        </span>
      ),
    },
    {
      key: "phone_to",
      dataIndex: "phone_to",
      title: "Tелефон получателя",
      render: (_, record) => (
        <span className={color(Number(record.status))}>{record.phone_to}</span>
      ),
    },
    {
      key: "from_to",
      dataIndex: "from_to",
      title: "Откуда/Куда",
      width: 600,
      render: (_, record) => (
        <span className={color(Number(record.status))}>
          {record.nameid_oblasty_from} обл., {record.nameid_city_from},{" "}
          {record.address_from} / {record.nameid_oblasty_to} обл.,{" "}
          {record.nameid_city_to}, {record.address_to}
        </span>
      ),
      onFilter: (value, record) => record.from.startsWith(value),
    },
    {
      key: "delivery_to_time",
      dataIndex: "delivery_to_time",
      title: "Дата/время",
      render: (text, record) => (
        <span className={color(Number(record.status))}>
          {dayjs.utc(text).format("DD.MM.YYYY HH:mm:ss")}
        </span>
      ),
      sorter: (a, b) =>
        new Date(a.delivery_to_time) - new Date(b.delivery_to_time),
    },

    {
      key: "status",
      dataIndex: "status",
      title: "Курьер",
      width: 200,
      render: (_, record) => {
        if (record.status === 1) {
          return (
            <Select
              allowClear
              onChange={(value) => onUpdateStatus(value, record?.guid)}
              showSearch
              optionFilterProp="label"
              placeholder="Назначить курьера"
              className={clsx(styles.assign)}
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={filteredUsers}
            />
          );
        }
        const courier = couriers.find(
          (item) => +item.codeid === +record.code_sp_courier
        );
        return (
          <span className={color(Number(record.status))}>
            {courier?.nameid}
          </span>
        );
      },
    },

    {
      key: "summa",
      dataIndex: "summa",
      title: "Сумма",
      width: 120,
      sorter: (a, b) => a.sum - b.sum,
      render: (_, record) => (
        <span className={color(Number(record.status))}>{record.summa}</span>
      ),
    },
    {
      key: "actions",
      dataIndex: "actions",
      title: "...",
      width: 150,
      align: "center",
      render: (_, record) => {
        if (record.status === 1 || record.status === 2 || record.status === 6) {
          return (
            <span
              className={styles.tab_label + " " + bg_color(Number(7))}
              onClick={() => onOpenCancelModal(record?.guid)}
            >
              <WarningOutlined /> Отменить
            </span>
          );
        }
        if (record.status === 7) {
          return (
            <span
              className={styles.tab_label + " " + bg_color(Number(7))}
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
