import { DatePicker, Flex, Input, Table } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useDeleteOrderMutation, useGetOrdersQuery } from "../../store";
import styles from "./CancelOrdersPage.module.scss";
import clsx from "clsx";
import debounce from "lodash.debounce";
import { useCancelOrdersColumns } from "./useCancelOrdersColumns";
import { WarningModal } from "../../components";
import { useWindowSize } from "../../hooks";
import { toast } from "react-toastify";

export const CancelOrdersPage = () => {
  const [search, setSearch] = useState();
  const { data, isLoading, isFetching } = useGetOrdersQuery({
    ...(search && { search }),
    ...{ status: "7" },
  });
  const [openModal, setOpenModal] = useState(false);
  const [orderGuid, setOrderGuid] = useState("");
  const { height: windowHeight } = useWindowSize();
  const [deleteOrder] = useDeleteOrderMutation();

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

  const tableHeight = useMemo(() => {
    const filterHeight = 150;
    const pagePadding = 100;
    const minHeight = 400;
    const maxHeight = 800;

    const availableHeight = windowHeight - filterHeight - pagePadding;
    return Math.max(minHeight, Math.min(availableHeight, maxHeight));
  }, [windowHeight]);

  const onDeleteOrder = async () => {
    try {
      await deleteOrder({ guid: orderGuid }).unwrap();
      toast.success("Вы успешно удалили заказ!");
    } catch (err) {
      console.error("Ошибка при удалении заказа", err);
    }
  };

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
          scroll={{ x: 1000, y: tableHeight }}
          pagination={false}
        />
      </div>
      <WarningModal
        title={"удалить заказ"}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onConfirm={onDeleteOrder}
      />
    </>
  );
};
