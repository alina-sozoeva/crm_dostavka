import { Button, Flex, Input, Select, Table, Tabs } from "antd";
import { useOrderColumns } from "./useOrderColumns";
import { useEffect, useMemo, useState } from "react";
import {
  useGetOrdersQuery,
  useGetUsersQuery,
  useTakeOrderMutation,
  useUpdateStatusCourierMutation,
} from "../../../../store";
import { order_status } from "../../../../enums";
import { AddOrderModal } from "../../../../components";
import { toast } from "react-toastify";
import debounce from "lodash.debounce";
import styles from "./OrderTable.module.scss";
import clsx from "clsx";

export const OrderTable = () => {
  const [openModal, setOpenModal] = useState(false);
  const { data: users } = useGetUsersQuery();
  const [updateStatus] = useUpdateStatusCourierMutation();
  const [takeOrder] = useTakeOrderMutation();
  const [isStatus, setIsStatus] = useState();
  const [search, setSearch] = useState();
  const [courierId, setCourierId] = useState();
  const { data: allOrders } = useGetOrdersQuery({});

  const {
    data: orders,
    isLoading,
    isFetching,
  } = useGetOrdersQuery({
    ...(search && { search }),
    ...(courierId && { code_sp_courier: courierId }),
    ...(isStatus && { status: isStatus }),
  });

  const debouncedSetSearch = useMemo(
    () => debounce((value) => setSearch(value), 400),
    []
  );

  const handleSearchChange = (e) => {
    debouncedSetSearch(e.target.value);
  };

  const onUpdateStatus = async (value, record) => {
    try {
      await takeOrder({
        code_sp_courier: value,
        guid_order: record?.guid,
      });

      await updateStatus({
        code_user: value,
        code_status: "2",
        guid_order: record?.guid,
      });
    } catch (error) {
      console.error("Ошибка при обновлении статуса или взятии заказа", error);
    }

    toast.success("Вы успешно назначили курьера!");
  };

  const onChange = (key) => {
    setIsStatus(key);
  };

  const filteredUsers = useMemo(() => {
    return users?.data
      .filter((item) => item.code_sp_user_position === 2)
      .map((item) => ({
        label: item.nameid,
        value: item.codeid,
      }));
  }, [users]);

  const bg_color = (status) => {
    switch (status) {
      case 1:
        return styles.red;
      case 2:
        return styles.orange;
      case 3:
        return styles.green;
      case 4:
        return styles.blue;
      case 5:
        return styles.sinii;
      case 6:
        return styles.purple;
      default:
        return "";
    }
  };

  const color = (status) => {
    switch (status) {
      case 1:
        return styles.red_text;
      case 2:
        return styles.orange_text;
      case 3:
        return styles.green_text;
      case 4:
        return styles.blue_text;
      case 5:
        return styles.sinii_text;
      case 6:
        return styles.purple_text;
      default:
        return "";
    }
  };

  const { columns } = useOrderColumns({
    filteredUsers,
    onUpdateStatus,
    bg_color,
    color,
  });

  const statuses = useMemo(() => {
    const all = allOrders?.data || [];

    const statusCounts = all.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {});

    return [
      {
        key: 0,
        label: `Все (${all.length})`,
      },
      ...Object.entries(order_status)
        .filter(([key]) => key !== "0")
        .map(([key, label]) => ({
          key: Number(key),
          label: `${label} (${statusCounts[key] || 0})`,
        })),
    ];
  }, [allOrders]);

  const coloredTabs = statuses.map((item) => ({
    ...item,
    label: (
      <span className={styles.tab_label + " " + bg_color(item.key)}>
        {item.label}
      </span>
    ),
  }));

  useEffect(() => {
    return () => {
      debouncedSetSearch.cancel();
    };
  }, [debouncedSetSearch]);

  return (
    <>
      <Flex
        vertical
        className={clsx(styles.filter)}
        justify="space-between"
        gap="small"
      >
        <Flex justify="space-between" align="center" wrap="wrap">
          <Flex justify="space-between" className={clsx(styles.tabs)}>
            <Tabs
              className={clsx(bg_color)}
              defaultActiveKey={0}
              items={coloredTabs}
              onChange={onChange}
            />

            <Button
              className={clsx("mt-2 ml-2")}
              type="primary"
              onClick={() => setOpenModal(true)}
            >
              Добавить заказ
            </Button>
          </Flex>
        </Flex>
        <Flex justify="space-between">
          <Flex gap="small" className={clsx("mb-4")}>
            <Input
              placeholder="Поиск по ФИО отправителя/получателя, номер телефона..."
              className={clsx(styles.search)}
              onChange={handleSearchChange}
              />
            <Flex gap="small">
              <Select
                allowClear
                showSearch
                placeholder="Выберите курьера"
                style={{ width: "150px" }}
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={filteredUsers}
                onChange={(value) => setCourierId(value)}
              />

              {/* <DatePicker placeholder="Выберите дату" /> */}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <div className={clsx(styles.table_wrapper)}>
        <Table
          bordered
          loading={isLoading || isFetching}
          columns={columns}
          dataSource={orders?.data || []}
          rowKey="guid"
          className={clsx(styles.table)}
          scroll={{ x: 1950, y: 400 }}
          pagination={{
            pageSize: 16,
            showSizeChanger: false,
          }}
        />
      </div>
      <AddOrderModal open={openModal} onCancel={() => setOpenModal(false)} />
    </>
  );
};
