import { Flex, Input, Select, Table } from "antd";
import { useMemo } from "react";
import { useGetOrdersQuery, useGetUsersQuery } from "../../store";
import { useNotificationsColumns } from "./useNotificationsColumns";
import { order_status } from "../../enums";
import styles from "./NotificationsPage.module.scss";
import clsx from "clsx";

export const NotificationsPage = () => {
  const { data, isLoading, isFetching } = useGetOrdersQuery();
  const { data: users } = useGetUsersQuery();

  const filteredData = useMemo(() => {
    return data?.data.filter((item) => item.status === 1);
  }, [data]);

  const { columns } = useNotificationsColumns();

  const filteredUsers = useMemo(() => {
    return users?.data
      .filter((item) => +item.code_sp_user_position === 2)
      .map((item) => ({
        value: item.codeid,
        label: item.nameid,
      }));
  }, [users]);

  console.log(filteredUsers, "filteredUsers");

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
              <Select
                style={{ width: "150px" }}
                options={filteredUsers}
                placeholder="Курьер"
              />
              <Select
                style={{ width: "200px" }}
                options={filteredUsers}
                placeholder="Место назначения"
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <div className={clsx("")}>
        <Table
          bordered
          loading={isLoading || isFetching}
          columns={columns}
          dataSource={filteredData}
          rowKey="guid"
          scroll={{ x: 1950 }}
        />
      </div>
    </>
  );
};
