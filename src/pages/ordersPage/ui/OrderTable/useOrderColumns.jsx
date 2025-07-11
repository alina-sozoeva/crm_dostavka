import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { order_status } from "../../../../enums";
import clsx from "clsx";
import styles from "./OrderTable.module.scss";
import { Select } from "antd";
import { useMemo, useState } from "react";
import { useGetUsersQuery } from "../../../../store";

dayjs.extend(utc);

export const useOrderColumns = ({
  filteredUsers,
  onUpdateStatus,
  bg_color,
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
      render: (_, item) => (
        <span>
          {item.fio_from}/{item.fio_to}
        </span>
      ),
    },
    {
      key: "phone_from",
      dataIndex: "phone_from",
      title: "Tелефон отправителя",
    },
    { key: "phone_to", dataIndex: "phone_to", title: "Tелефон получателя" },
    {
      key: "from_to",
      dataIndex: "from_to",
      title: "Откуда/Куда",
      width: 500,
      render: (_, record) => (
        <span>
          {record.nameid_oblasty_from} обл., {record.nameid_city_from},{" "}
          {record.address_from} / {record.nameid_oblasty_to} обл.,{" "}
          {record.nameid_city_to}, {record.address_to}
        </span>
      ),
      // filters: [
      //   {
      //     text: "Manasa",
      //     value: "Manasa",
      //   },
      //   {
      //     text: "Alamedin",
      //     value: "Alamedin",
      //   },
      // ],
      // filterMode: "tree",
      // filterSearch: true,
      onFilter: (value, record) => record.from.startsWith(value),
    },
    {
      key: "delivery_to_time",
      dataIndex: "delivery_to_time",
      title: "Дата/время",
      render: (text) => (
        <span>{dayjs.utc(text).format("DD.MM.YYYY HH:mm")}</span>
      ),
    },

    {
      key: "status",
      dataIndex: "status",
      title: "Курьер",
      // align: "center",
      width: 200,
      render: (_, record) => {
        if (record.status === 1) {
          return (
            <Select
              allowClear
              onChange={(value) => onUpdateStatus(value, record)}
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
        return courier?.nameid;
      },
    },
    {
      key: "status",
      dataIndex: "status",
      title: "Статус",
      // align: "center",
      width: 200,
      render: (_, record) => (
        <span
          className={styles.tab_label + " " + bg_color(Number(record.status))}
        >
          {order_status[record.status]}
        </span>
      ),
    },
    {
      key: "summa",
      dataIndex: "summa",
      title: "Сумма",
      width: 180,
      sorter: (a, b) => a.sum - b.sum,
    },
  ];

  return { columns };
};
