import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const useOrderColumns = () => {
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
      render: (_, record) => (
        <span>
          {record.nameid_oblasty_from} обл., {record.nameid_city_from},{" "}
          {record.address_from} / {record.nameid_oblasty_to} обл.,{" "}
          {record.nameid_city_to}, {record.address_to}
        </span>
      ),
      filters: [
        {
          text: "Manasa",
          value: "Manasa",
        },
        {
          text: "Alamedin",
          value: "Alamedin",
        },
      ],
      filterMode: "tree",
      filterSearch: true,
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
      key: "summa",
      dataIndex: "summa",
      title: "Сумма",
      sorter: (a, b) => a.sum - b.sum,
    },
  ];

  return { columns };
};
