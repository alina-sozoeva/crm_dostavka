import { Button, Flex, Input, Select, Table, Tabs } from "antd";
import { useOrderColumns } from "./useOrderColumns";
import styles from "./OrderTable.module.scss";
import clsx from "clsx";
import { useMemo, useState } from "react";
import {
  useGetOrdersQuery,
  useGetUsersQuery,
  useTakeOrderMutation,
  useUpdateStatusCourierMutation,
} from "../../../../store";
import { order_status } from "../../../../enums";
import { useLocationsData } from "../../../../hooks";
import { AddOrderModal } from "../../../../components";
import { toast } from "react-toastify";

export const OrderTable = () => {
  const [openModal, setOpenModal] = useState(false);
  const { data: orders, isLoading } = useGetOrdersQuery();
  const { data: users } = useGetUsersQuery();
  const [updateStatus] = useUpdateStatusCourierMutation();
  const [takeOrder] = useTakeOrderMutation();
  const [isStatus, setIsStatus] = useState();
  const [countryId, setCountryId] = useState();
  const [regionId, setRegionId] = useState();

  const { countries, regions, cities } = useLocationsData();

  const mapCountries = useMemo(() => {
    return countries?.data?.map((item) => ({
      value: item.codeid,
      label: item.country_name,
    }));
  }, [countries]);

  const mapRegions = useMemo(() => {
    const filteredData = regions?.data || [];

    if (countryId) {
      filteredData?.filter((item) => item?.code_country === countryId);
    }

    return filteredData?.map((item) => ({
      value: item.codeid,
      label: item.region_name,
    }));
  }, [regions, countryId]);

  const mapCities = useMemo(() => {
    const filteredData = cities?.data || [];

    if (regionId) {
      filteredData?.filter((item) => item.code_region === regionId);
    }
    return filteredData?.map((item) => ({
      value: item.codeid,
      label: item.gorod_name,
    }));
  }, [cities, regionId]);

  const onUpdateStatus = async (value, record) => {
    debugger;
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

  const { columns } = useOrderColumns({
    filteredUsers,
    onUpdateStatus,
    bg_color,
  });

  const statuses = useMemo(() => {
    const all = orders?.data || [];

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
  }, [orders]);

  const filteredOrders = useMemo(() => {
    if (isStatus) {
      return orders?.data?.filter((item) => item.status === isStatus);
    }
    return orders?.data;
  }, [orders, isStatus]);

  const onChange = (key) => {
    setIsStatus(key);
  };

  const handleChangeCountry = (value) => {
    setCountryId(value);
  };

  const handleChangeRegion = (value) => {
    setRegionId(value);
  };

  const coloredTabs = statuses.map((item) => ({
    ...item,
    label: (
      <span className={styles.tab_label + " " + bg_color(item.key)}>
        {item.label}
      </span>
    ),
  }));

  return (
    <>
      <Flex
        vertical
        className={clsx(styles.filter)}
        justify="space-between"
        gap="small"
      >
        <Flex justify="space-between" align="center" wrap="wrap">
          <Flex className={clsx(styles.tabs)}>
            <Tabs
              className={clsx(bg_color, "flex-wrap")}
              defaultActiveKey={0}
              items={coloredTabs}
              onChange={onChange}
            />
          </Flex>

          <Button type="primary" onClick={() => setOpenModal(true)}>
            Добавить заказ
          </Button>
        </Flex>
        <Flex justify="space-between">
          <Flex gap="small" className={clsx("mb-4")}>
            <Input placeholder="Поиск" className={clsx(styles.search)} />
            <Flex gap="small">
              <Select
                allowClear
                showSearch
                placeholder="Cтрана"
                style={{ width: "150px" }}
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={mapCountries}
                onChange={handleChangeCountry}
              />
              <Select
                allowClear
                showSearch
                style={{ width: "150px" }}
                placeholder="Область"
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={mapRegions}
                onChange={handleChangeRegion}
              />
              <Select
                allowClear
                showSearch
                style={{ width: "150px" }}
                placeholder="Город"
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={mapCities}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <div className={clsx(styles.table_wrapper)}>
        <Table
          bordered
          loading={isLoading}
          columns={columns}
          dataSource={filteredOrders}
          rowKey="guid"
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
