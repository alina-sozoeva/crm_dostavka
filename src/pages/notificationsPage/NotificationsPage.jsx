import { Flex, Input, Select, Table } from "antd";
import { useMemo } from "react";
import { useGetOrdersQuery } from "../../store";
import { useNotificationsColumns } from "./useNotificationsColumns";
import { order_status } from "../../enums";
import styles from "./NotificationsPage.module.scss";
import clsx from "clsx";

const statuses = [{ key: 0, label: "test" }];

export const NotificationsPage = () => {
  const { data, isLoading } = useGetOrdersQuery();

  const filteredData = useMemo(() => {
    return data?.data.filter((item) => item.status === 1);
  }, [data]);

  const { columns } = useNotificationsColumns();

  return (
    <>
      <Flex
        vertical
        className={clsx(styles.filter)}
        justify="space-between"
        gap="small"
      >
        <Flex justify="space-between">
          <Flex gap="small" className={clsx("mb-4")}>
            <Input placeholder="Поиск" className={clsx(styles.search)} />
            <Flex gap="small">
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
          dataSource={filteredData}
          rowKey="guid"
          scroll={{ x: 1950 }}
        />
      </div>
    </>
  );
};
