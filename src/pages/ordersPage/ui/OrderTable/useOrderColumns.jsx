import { Flex, Select, Tooltip } from "antd";
import { useMemo } from "react";
import { useGetUsersQuery } from "../../../../store";
import { CloseOutlined, DownloadOutlined } from "@ant-design/icons";
import styles from "./OrderTable.module.scss";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
import clsx from "clsx";
import { FaRegTrashAlt } from "react-icons/fa";

dayjs.extend(utc);

export const useOrderColumns = ({
  filteredUsers,
  onOpenCancelModal,
  onUpdateStatus,
  onOpenWarnModal,
  color,
  handlePrint,
}) => {
  const { data } = useGetUsersQuery({});

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
      render: (_, record, idx) => (
        <span className={color(Number(record.status))}>{idx + 1}</span>
      ),
    },
    {
      key: "tracking_number",
      dataIndex: "tracking_number",
      title: "Трек номер",
      width: 140,
      ellipsis: true,
      render: (_, record) => (
        <span className={color(Number(record.status))}>
          <b>{record.tracking_number}</b>
        </span>
      ),
    },
    {
      key: "fio_from_to",
      dataIndex: "fio_from_to",
      title: "Отпр/получ",
      width: 180,
      ellipsis: true,
      render: (_, record) => (
        <span className={color(Number(record.status))}>
          {record.fio_from}/{record.fio_to}
        </span>
      ),
    },
    {
      key: "phone_from",
      dataIndex: "phone_from",
      title: "Tел отпр",
      width: 140,
      ellipsis: true,
      render: (_, record) => (
        <span className={color(Number(record.status))}>
          {record.phone_from}
        </span>
      ),
    },
    {
      key: "phone_to",
      dataIndex: "phone_to",
      title: "Tел получ",
      width: 140,
      ellipsis: true,
      render: (_, record) => (
        <span className={color(Number(record.status))}>{record.phone_to}</span>
      ),
    },
    {
      key: "code_sp_courier",
      dataIndex: "code_sp_courier",
      title: "Курьер",
      width: 200,
      render: (_, record) => {
        if (record.status === 1 || record.status === 8) {
          return (
            <Select
              allowClear
              size="middle"
              onChange={(value) => onUpdateStatus(value, record?.guid)}
              showSearch
              optionFilterProp="label"
              placeholder="Назначить курьера"
              className={clsx(styles.assign)}
              style={{ width: "100%" }}
              dropdownMatchSelectWidth={false}
              getPopupContainer={(trigger) => trigger.parentNode}
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
      key: "from_to",
      dataIndex: "from_to",
      title: "Откуда/Куда",
      width: 600,
      ellipsis: true,
      render: (_, record) => {
        const text = `${record.nameid_oblasty_from} обл., ${record.nameid_city_from}, ${record.address_from} / ${record.nameid_oblasty_to} обл., ${record.nameid_city_to}, ${record.address_to}`;
        return <span className={color(Number(record.status))}>{text}</span>;
      },
      onFilter: (value, record) => record.from.startsWith(value),
    },
    // {
    //   key: "postal_code_to",
    //   dataIndex: "postal_code_to",
    //   title: "Tелефон получателя",
    //   render: (_, record) => (
    //     <span >
    //       {record.postal_code_to}
    //     </span>
    //   ),
    // },
    {
      key: "delivery_to_time",
      dataIndex: "delivery_to_time",
      title: "Дата/время",
      width: 190,
      render: (text, record) => (
        <span className={color(Number(record.status))}>
          {dayjs.utc(text).format("DD.MM.YYYY HH:mm:ss")}
        </span>
      ),
      sorter: (a, b) =>
        new Date(a.delivery_to_time) - new Date(b.delivery_to_time),
    },

    {
      key: "summa",
      dataIndex: "summa",
      title: "Сумма",
      width: 110,
      sorter: (a, b) => Number(a.summa) - Number(b.summa),
      render: (_, record) => (
        <span className={color(Number(record.status))}>
          <b>{Number(record.summa).toLocaleString()}</b>
        </span>
      ),
    },
    {
      key: "payment_status",
      dataIndex: "payment_status",
      title: "Статус оплаты",
      width: 110,
      render: (_, record) => {
        record.payment_status === 1 ? (
          <span className={color(Number(record.status))}>Оплачено</span>
        ) : (
          <span className={color(Number(record.status))}>Не оплачено</span>
        );
      },
    },
    {
      key: "actions",
      dataIndex: "actions",
      title: "...",
      width: 40,
      align: "center",
      render: (_, record) => {
        return (
          <Flex gap="small">
            {(record.status === 1 ||
              record.status === 2 ||
              record.status === 6) && (
              <Tooltip title="Отменить заказ">
                <span
                  className={clsx(styles.btn, "text-orange-500")}
                  role="button"
                  aria-label="Отменить заказ"
                  onClick={() => onOpenCancelModal(record?.guid)}
                >
                  <CloseOutlined />
                </span>
              </Tooltip>
            )}
            {record.status === 7 && (
              <Tooltip title="Удалить заказ">
                <span
                  className={clsx(styles.btn, "text-red-500")}
                  role="button"
                  aria-label="Удалить заказ"
                  onClick={() => onOpenWarnModal(record?.guid)}
                >
                  <FaRegTrashAlt />
                </span>
              </Tooltip>
            )}
            {record.status !== 1 &&
              record.status !== 7 &&
              record.status !== 8 && (
                <Tooltip title="Скачать PDF">
                  <span
                    className={clsx(styles.btn, "text-blue-500")}
                    role="button"
                    aria-label="Скачать PDF"
                    onClick={() => handlePrint(record?.guid)}
                  >
                    <DownloadOutlined />
                  </span>
                </Tooltip>
              )}
          </Flex>
        );
      },
    },
  ];

  return { columns };
};
