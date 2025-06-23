import { Button, Flex, Input, Select, Table, Tabs } from "antd";
import { useOrderColumns } from "./useOrderColumns";
import styles from "./OrderTable.module.scss";
import clsx from "clsx";
import { useState } from "react";
import { OrderModal } from "../OrderModal";
import { useGetOrdersQuery } from "../../../../store";

const statuses = [
  { key: "all", label: <span>Все (99)</span> },
  { key: "exception", label: <span>Исключения (3)</span> },
  { key: "failed_attempt", label: <span>Неудачная попытка (1)</span> },
  { key: "expired", label: <span>Истёк срок (6)</span> },
  { key: "out_for_delivery", label: <span>В пути к получателю (0)</span> },
  { key: "delivered", label: <span>Доставлено (70)</span> },
  { key: "pending", label: <span>Ожидает отправки (11)</span> },
];

export const OrderTable = () => {
  const [openModal, setOpenModal] = useState(false);
  const { columns } = useOrderColumns();
  const { data, isLoading } = useGetOrdersQuery();

  const onChange = (key) => {};

  return (
    <>
      <Flex
        vertical
        className={clsx(styles.filter)}
        justify="space-between"
        gap="small"
      >
        <Flex justify="space-between" align="center" wrap="wrap">
          <Tabs
            className={clsx("flex-wrap")}
            defaultActiveKey="1"
            items={statuses}
            onChange={onChange}
          />
          <Button type="primary" onClick={() => setOpenModal(true)}>
            Добавить заказ
          </Button>
        </Flex>
        <Flex justify="space-between">
          <Flex gap="small" className={clsx("mb-4")}>
            <Input placeholder="Поиск" className={clsx(styles.search)} />
            <Flex gap="small">
              <Select options={statuses} placeholder="Статус" />
              <Select options={statuses} placeholder="Курьер" />
              <Select options={statuses} placeholder="Место назначения" />
            </Flex>
          </Flex>
          <Select options={statuses} placeholder="Сортировать по" />
        </Flex>
      </Flex>
      <div className={clsx("")}>
        <Table
          loading={isLoading}
          columns={columns}
          dataSource={data?.data}
          rowKey="guid"
          scroll={{ x: 1600 }}
        />
      </div>
      <OrderModal open={openModal} onCancel={() => setOpenModal(false)} />
    </>
  );
};
