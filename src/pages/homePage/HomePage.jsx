import clsx from "clsx";
import { Button, Flex, Table } from "antd";
import { BarGraf, StatusCard } from "./ui";
import { useNavigate } from "react-router-dom";
import { pathName } from "../../enums";
import styles from "./HomePage.module.scss";
import { useGetOrdersQuery } from "../../store";

const orders = [
  {
    id: 13343,
    client: "Testov Test",
    courier: "Couriervich",
    from: "Manasa",
    to: "Alamedin",
    date: "12.12.2012 07:00",
    sum: "100",
    status: "",
    type_order: "Оператор",
  },
  {
    id: 23435,
    client: "Testov Test2",
    courier: "Couriervich",
    from: "Alamedin",
    to: "Manasa",
    date: "12.12.2025 07:00",
    sum: "2000",
    status: "",
    type_order: "Сайт",
  },
  {
    id: 33435,
    client: "Testov Test2",
    courier: "Couriervich",
    from: "Manasa",
    to: "Alamedin",
    date: "12.12.2013 07:00",
    sum: "1000",
    status: "",
    type_order: "Сайт",
  },
];

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

export const HomePage = () => {
  const navigate = useNavigate();
  const onOrder = () => {
    navigate(`${pathName.orders}`);
  };

  const { data } = useGetOrdersQuery();

  console.log(data, "data");

  return (
    <main className={clsx("")}>
      <div className={clsx("mb-10")}>
        <StatusCard />
      </div>

      <Flex>
        <Flex align="start" vertical gap="middle">
          {/* <BarGraf /> */}
          <Flex>{/* <PieGraf /> */}</Flex>
        </Flex>
      </Flex>
      {/* <Flex className={clsx("")}> */}
      {/* <Flex align="end" vertical className={clsx("w-full")}>
          <Button type="link">Смотреть все</Button>
          <Table
            className={clsx("w-full")}
            columns={columns}
            dataSource={orders}
            pagination={false}
            scroll={{ x: 500 }}
          />
        </Flex> */}

      <Flex align="end" vertical className={clsx("w-full")}>
        <Button type="link">Смотреть все</Button>
        <Table
          className={clsx("w-full")}
          columns={columns}
          dataSource={orders}
          pagination={false}
          scroll={{ x: 500 }}
        />
      </Flex>
      {/* </Flex> */}
    </main>
  );
};
