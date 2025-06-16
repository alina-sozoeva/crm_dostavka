export const useOrderColumns = () => {
  const columns = [
    {
      key: "id",
      dataIndex: "id",
      title: "№ заказа",
    },
    { key: "status", dataIndex: "status", title: "Клиент" },
    { key: "courier", dataIndex: "courier", title: "Курьер" },
    { key: "from_to", dataIndex: "from_to", title: "Откуда/Куда" },
    { key: "date", dataIndex: "date", title: "Дата/время" },
    { key: "sum", dataIndex: "sum", title: "Сумма" },
  ];

  return { columns };
};
