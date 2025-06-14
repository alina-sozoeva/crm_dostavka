export const useOrderColumns = () => {
  const columns = [
    {
      key: "id",
      dataIndex: "id",
      title: "№",
    },
    { key: "client", dataIndex: "client", title: "Клиент" },
    { key: "phone", dataIndex: "phone", title: "Телефон" },
    { key: "date", dataIndex: "date", title: "Дата/время" },
    { key: "courier", dataIndex: "courier", title: "Курьер" },
    { key: "from", dataIndex: "from", title: "Откуда" },
    { key: "order", dataIndex: "order", title: "Заказ" },
    { key: "sum", dataIndex: "sum", title: "Сумма" },
    { key: "office", dataIndex: "office", title: "Офис" },
    { key: "to", dataIndex: "to", title: "Куда" },
    { key: "partner", dataIndex: "partner", title: "Партнер" },
    { key: "comment", dataIndex: "comment", title: "Комментарий" },
    { key: "order_num", dataIndex: "order_num", title: "№ заказа" },
    { key: "order_type", dataIndex: "order_type", title: "Тип заказа" },
  ];

  return { columns };
};
