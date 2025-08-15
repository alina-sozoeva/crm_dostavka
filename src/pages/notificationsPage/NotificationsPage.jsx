import { DatePicker, Flex, Input, Table } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useGetOrdersQuery, useGetUsersQuery } from "../../store";
import { useNotificationsColumns } from "./useNotificationsColumns";
import styles from "./NotificationsPage.module.scss";
import clsx from "clsx";
import debounce from "lodash.debounce";

export const NotificationsPage = () => {
  const { data: users } = useGetUsersQuery();
  const [search, setSearch] = useState();
  const { data, isLoading, isFetching } = useGetOrdersQuery({
    ...(search && { search }),
  });

  const debouncedSetSearch = useMemo(
    () => debounce((value) => setSearch(value), 400),
    []
  );

  const handleSearchChange = (e) => {
    debouncedSetSearch(e.target.value);
  };

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

  useEffect(() => {
    return () => {
      debouncedSetSearch.cancel();
    };
  }, [debouncedSetSearch]);

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
            <Input
              placeholder="Поиск по ФИО отправителя/получателя, номер телефона..."
              className={clsx(styles.search)}
              onChange={handleSearchChange}
            />
            <DatePicker placeholder="Выберите дату" />
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
          pagination={{
            pageSize: 16,
            showSizeChanger: false,
          }}
        />
      </div>
    </>
  );
};
