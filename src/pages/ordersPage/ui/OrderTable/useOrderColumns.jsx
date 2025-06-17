export const useOrderColumns = () => {
  const columns = [
    {
      key: "id",
      dataIndex: "id",
      title: "№ заказа",
      width: 100,
      align: "center",
    },
    { key: "client", dataIndex: "client", title: "Клиент" },
    { key: "courier", dataIndex: "courier", title: "Курьер" },
    {
      key: "from_to",
      dataIndex: "from_to",
      title: "Откуда/Куда",
      render: (_, record) => (
        <span>
          {record.from}/{record.to}
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
      key: "date",
      dataIndex: "date",
      title: "Дата/время",
      render: (text) => <span>{text}</span>,
    },
    // {
    //   key: "type_order",
    //   dataIndex: "type_order",
    //   title: "Тип заказа",
    //   render: (text) => <span>{text}</span>,
    // },
    {
      key: "sum",
      dataIndex: "sum",
      title: "Сумма",
      sorter: (a, b) => a.sum - b.sum,
    },
  ];

  return { columns };
};
