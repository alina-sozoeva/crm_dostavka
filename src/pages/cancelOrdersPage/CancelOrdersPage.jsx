import { DatePicker, Flex, Input, Table } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useGetOrdersQuery, useGetUsersQuery } from "../../store";
// import { useNotificationsColumns } from "./useNotificationsColumns";
import styles from "./CancelOrdersPage.module.scss";
import clsx from "clsx";
import debounce from "lodash.debounce";
import { useCancelOrdersColumns } from "./useCancelOrdersColumns";
import { WarningModal } from "../../components";

export const CancelOrdersPage = () => {
  const [search, setSearch] = useState();
  const { data, isLoading, isFetching } = useGetOrdersQuery({
    ...(search && { search }),
    ...{ status: "7" },
  });
  const [openModal, setOpenModal] = useState(false);
  const [orderGuid, setOrderGuid] = useState("");

  const debouncedSetSearch = useMemo(
    () => debounce((value) => setSearch(value), 400),
    []
  );

  const handleSearchChange = (e) => {
    debouncedSetSearch(e.target.value);
  };

  const onOpenWarnModal = (guid) => {
    setOpenModal(true);
    setOrderGuid(guid);
  };

  useEffect(() => {
    return () => {
      debouncedSetSearch.cancel();
    };
  }, [debouncedSetSearch]);

  const { columns } = useCancelOrdersColumns({ onOpenWarnModal });

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
          dataSource={data?.data}
          rowKey="guid"
          scroll={{ x: 1600 }}
        />
      </div>
      <WarningModal
        title={"удалить заказ"}
        open={openModal}
        onCancel={() => setOpenModal(false)}
      />
    </>
  );
};
