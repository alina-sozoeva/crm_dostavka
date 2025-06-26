import { Button, Flex, Input, Select, Table, Tabs } from "antd";
import { useOrderColumns } from "./useOrderColumns";
import styles from "./OrderTable.module.scss";
import clsx from "clsx";
import { useMemo, useState } from "react";
import { OrderModal } from "../OrderModal";
import {
  useGetOrdersQuery,
  useGetUsersQuery,
  useTakeOrderMutation,
  useUpdateStatusCourierMutation,
} from "../../../../store";
import { order_status } from "../../../../enums";
import { useLocationsData } from "../../../../hooks";

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
    return regions?.data
      ?.filter((item) => item?.code_country === countryId)
      ?.map((item) => ({
        value: item.codeid,
        label: item.region_name,
      }));
  }, [regions, countryId]);

  const mapCities = useMemo(() => {
    return cities?.data
      ?.filter((item) => item.code_region === regionId)
      ?.map((item) => ({
        value: item.codeid,
        label: item.gorod_name,
      }));
  }, [cities, regionId]);

  const onUpdateStatus = (value, record) => {
    updateStatus({
      code_user: value,
      code_status: "2",
      guid_order: record?.guid,
    });

    takeOrder({
      code_sp_courier: value,
      guid_order: record?.guid,
    });
  };

  const filteredUsers = useMemo(() => {
    return users?.data
      .filter((item) => item.code_sp_user_position === 2)
      .map((item) => ({
        label: item.nameid,
        value: item.codeid,
      }));
  }, [users]);

  const { columns } = useOrderColumns({ filteredUsers, onUpdateStatus });

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
      return orders?.data?.filter((item) => {
        const filterData = item.status === isStatus;
        return filterData;
      });
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
            defaultActiveKey={0}
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
      <div className={clsx("")}>
        <Table
          bordered
          loading={isLoading}
          columns={columns}
          dataSource={filteredOrders}
          rowKey="guid"
          scroll={{ x: 1950 }}
        />
      </div>
      <OrderModal open={openModal} onCancel={() => setOpenModal(false)} />
    </>
  );
};

// const statuses = [
//   {
//     key: 0,
//     label: (
//       <span>
//         {order_status[0]} ({length})
//       </span>
//     ),
//   },
//   {
//     key: 1,
//     label: (
//       <span>
//         {order_status[1]} ({length})
//       </span>
//     ),
//   },
//   {
//     key: 2,
//     label: (
//       <span>
//         {order_status[2]} ({length})
//       </span>
//     ),
//   },
//   {
//     key: 3,
//     label: (
//       <span>
//         {order_status[3]} ({length})
//       </span>
//     ),
//   },
//   {
//     key: 4,
//     label: (
//       <span>
//         {order_status[4]} ({length})
//       </span>
//     ),
//   },
//   {
//     key: 5,
//     label: (
//       <span>
//         {order_status[5]} ({length})
//       </span>
//     ),
//   },
//   {
//     key: 6,
//     label: (
//       <span>
//         {order_status[6]} ({length})
//       </span>
//     ),
//   },
// ];
