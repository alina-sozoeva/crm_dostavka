import { Button, Flex, Input, Select, Table, Tabs } from "antd";
import { useOrderColumns } from "./useOrderColumns";
import styles from "./OrderTable.module.scss";
import clsx from "clsx";
import { useMemo, useState } from "react";
import { OrderModal } from "../OrderModal";
import {
  useGetOrdersQuery,
  useGetUsersQuery,
  useUpdateStatusCourierMutation,
} from "../../../../store";
import { order_status } from "../../../../enums";
import { useSelector } from "react-redux";

const statuses = [
  { key: "0", label: <span>{order_status.all} (70)</span> },
  { key: "1", label: <span>{order_status[1]} (60)</span> },
  { key: "2", label: <span>{order_status[2]} (3)</span> },
  { key: "3", label: <span>{order_status[3]} (1)</span> },
  { key: "4", label: <span>{order_status[4]} (6)</span> },
  { key: "5", label: <span>{order_status[5]} (0)</span> },
  { key: "6", label: <span>{order_status[6]} (9)</span> },
];

export const OrderTable = () => {
  const [openModal, setOpenModal] = useState(false);
  const { data, isLoading } = useGetOrdersQuery();
  const { data: users } = useGetUsersQuery();
  const userId = useSelector((state) => state.user.userId);
  const [updateStatus] = useUpdateStatusCourierMutation();

  const onUpdateStatus = (value, record) => {
    updateStatus({
      code_user: value,
      code_status: "2",
      guid_order: record?.guid,
    });
  };

  const filteredData = useMemo(() => {
    return users?.data
      .filter((item) => item.codeid === "2")
      .map((item) => ({
        label: item.nameid,
        value: item.codeid,
      }));
  }, [users]);

  const { columns } = useOrderColumns({ filteredData, onUpdateStatus });

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
            defaultActiveKey="0"
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
          bordered
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
