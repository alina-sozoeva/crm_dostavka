import { Button, DatePicker, Flex, Input, Table } from "antd";
import { useOrderColumns } from "./useOrderColumns";
import { order_status } from "../../../../enums";
import styles from "./OrderTable.module.scss";
import clsx from "clsx";

const statuses = [
  "Не назначено",
  "В процессе",
  "Заказ готов",
  "Принято",
  "На выполнении",
  "Завершено",
  "Все",
];

const getStatusColor = (status) => {
  switch (status) {
    case order_status.NOT_ASSIGNED:
      return "default";
    case order_status.IN_PROCESS:
      return "yellow";
    case order_status.READY:
      return "orange";
    case order_status.ACCEPTED:
      return "pink";
    case order_status.IN_PROGRESS:
      return "green";
    case order_status.COMPLETED:
      return "blue";
    default:
      return "default";
  }
};

export const OrderTable = () => {
  const { columns } = useOrderColumns();

  return (
    <>
      <Flex
        className={clsx(styles.filter, "wrapper")}
        justify="space-between"
        gap="small"
      >
        <Flex gap="small">
          <Input placeholder="Поиск" />
          <DatePicker placeholder="Выберите дату" />
          <DatePicker placeholder="Выберите дату" />
        </Flex>
        <Flex gap="small">
          {statuses.map((item) => (
            <Button color={getStatusColor(item)} variant="filled">
              {item} [12]
            </Button>
          ))}
        </Flex>
      </Flex>
      <div className={clsx("wrapper")}>
        <Table columns={columns} />
      </div>
    </>
  );
};
