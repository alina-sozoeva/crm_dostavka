import { Button, Flex, Input, Select, Table, Tabs } from "antd";
import { useOrderColumns } from "./useOrderColumns";
import { useEffect, useMemo, useState } from "react";
import {
  useDeleteOrderMutation,
  useGetOrdersQuery,
  useGetUsersQuery,
  useTakeOrderMutation,
  useUpdateStatusCourierMutation,
} from "../../../../store";
import { order_status, pathName } from "../../../../enums";
import {
  AddOrderModal,
  CancelModal,
  WarningModal,
} from "../../../../components";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import styles from "./OrderTable.module.scss";
import clsx from "clsx";
import { useWindowSize } from "../../../../hooks";

const bg_color = (status) => {
  switch (status) {
    case 2:
      return styles.orange;
    case 3:
      return styles.sinii;
    case 4:
      return styles.blue;
    case 5:
      return styles.green;
    case 6:
      return styles.purple;
    case 7:
      return styles.red;
    case 8:
      return styles.pink;
    case 9:
      return styles.gray;
    default:
      return "";
  }
};

const color = (status) => {
  switch (status) {
    case 2:
      return styles.orange_text;
    case 3:
      return styles.sinii_text;
    case 4:
      return styles.blue_text;
    case 5:
      return styles.green_text;
    case 6:
      return styles.purple_text;
    case 7:
      return styles.red_text;
    case 8:
      return styles.pink_text;
    case 8:
      return styles.gray_text;
    default:
      return "";
  }
};

export const OrderTable = () => {
  const navigate = useNavigate();
  const { height: windowHeight } = useWindowSize();

  const { data: users } = useGetUsersQuery({});
  const { data: allOrders } = useGetOrdersQuery({});

  const [takeOrder] = useTakeOrderMutation();
  const userId = useSelector((state) => state.user.userId);

  const [updateStatus] = useUpdateStatusCourierMutation();
  const [openModal, setOpenModal] = useState(false);
  const [isStatus, setIsStatus] = useState();
  const [search, setSearch] = useState();
  const [courierId, setCourierId] = useState();
  const [openCancselModal, setOpenCancselModal] = useState(false);
  const [openWarnModal, setOpenWarnModal] = useState(false);
  const [orderGuid, setOrderGuid] = useState("");
  const [deleteOrder] = useDeleteOrderMutation();
  const [loading, setLoading] = useState(false);

  const tableHeight = useMemo(() => {
    const filterHeight = 150;
    const pagePadding = 100;
    const minHeight = 400;
    const maxHeight = 800;

    const availableHeight = windowHeight - filterHeight - pagePadding;
    return Math.max(minHeight, Math.min(availableHeight, maxHeight));
  }, [windowHeight]);

  const {
    data: orders,
    isLoading,
    isFetching,
  } = useGetOrdersQuery({
    ...(search && { search }),
    ...(courierId && { code_sp_courier: courierId }),
    ...(isStatus !== 0 && { status: isStatus }),
  });

  const filteredUsers = useMemo(() => {
    return users?.data
      .filter((item) => item.code_sp_user_position === 2)
      .map((item) => ({
        label: item.nameid,
        value: item.codeid,
      }));
  }, [users]);

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
      {
        key: 0,
        label: (
          <span
            className={styles.tab_label + " " + bg_color(7)}
            onClick={() => navigate(pathName.cancelOders)}
          >
            Отменен ({statusCounts[7] || 0})
          </span>
        ),
      },
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

  const debouncedSetSearch = useMemo(
    () => debounce((value) => setSearch(value), 400),
    []
  );

  const handleSearchChange = (e) => {
    debouncedSetSearch(e.target.value);
  };

  const onChange = (key) => {
    setIsStatus(key);
  };

  const onOpenCancelModal = (guid) => {
    setOpenCancselModal(true);
    setOrderGuid(guid);
  };

  const onOpenWarnModal = (guid) => {
    setOpenWarnModal(true);
    setOrderGuid(guid);
  };

  const onCancelOrder = async () => {
    try {
      await updateStatus({
        code_user: userId,
        code_status: "7",
        guid_order: orderGuid,
      });
    } catch (error) {
      console.error("Ошибка при обновлении статуса или взятии заказа", error);
    }

    toast.success("Вы успешно отменили заказ!");
  };

  const onUpdateStatus = async (value, guid) => {
    try {
      await takeOrder({
        code_sp_courier: value,
        guid_order: guid,
      }).unwrap();

      await updateStatus({
        code_user: userId,
        code_status: "2",
        guid_order: guid,
      }).unwrap();
      toast.success("Вы успешно назначили курьера!");
    } catch (error) {
      console.error("Ошибка при обновлении статуса или взятии заказа", error);
    }
  };

  const onDeleteOrder = async () => {
    try {
      await deleteOrder({ guid: orderGuid }).unwrap();
      toast.success("Вы успешно удалили заказ!");
    } catch (err) {
      console.error("Ошибка при удалении заказа", err);
    }
  };

  const handlePrint = async (guid) => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.REACT_APP_MAIN_URL}/pdf/${guid}/invoice.html`
      );
      if (!response.ok) throw new Error("Ошибка загрузки HTML");

      let html = await response.text();

      let iframe = document.getElementById("print-iframe");
      if (!iframe) {
        iframe = document.createElement("iframe");
        iframe.style.position = "fixed";
        iframe.style.right = "0";
        iframe.style.bottom = "0";
        iframe.style.width = "0";
        iframe.style.height = "0";
        iframe.style.border = "0";
        iframe.id = "print-iframe";
        document.body.appendChild(iframe);
      }

      const doc = iframe.contentWindow.document;
      doc.open();
      doc.write(html);
      doc.close();

      const images = doc.querySelectorAll("img");
      await Promise.all(
        Array.from(images).map((img) => {
          return new Promise((resolve) => {
            if (img.complete) resolve();
            else img.onload = img.onerror = resolve;
          });
        })
      );

      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    } catch (err) {
      console.error("Ошибка при печати:", err);
      alert("Не удалось загрузить документ для печати");
    } finally {
      setLoading(false);
    }
  };

  const { columns } = useOrderColumns({
    filteredUsers,
    onUpdateStatus,
    onOpenCancelModal,
    onOpenWarnModal,
    color,
    handlePrint,
  });

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
          </Flex>
        </Flex>
        <Flex justify="space-between">
          <Flex gap="small" align="center" className={clsx("mb-1")}>
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
            </Flex>
            <Button
              className={clsx("")}
              type="primary"
              onClick={() => setOpenModal(true)}
            >
              Добавить заказ
            </Button>
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
          pagination={false}
          scroll={{
            y: tableHeight,
          }}
          onRow={(record) => ({
            className: clsx(styles.table_row, bg_color(Number(record.status))),
          })}
        />
      </div>
      <AddOrderModal open={openModal} onCancel={() => setOpenModal(false)} />
      <CancelModal
        open={openCancselModal}
        onCancel={() => setOpenCancselModal(false)}
        onConfirm={onCancelOrder}
        orderGuid={orderGuid}
      />
      <WarningModal
        title={"удалить заказ"}
        open={openWarnModal}
        onCancel={() => setOpenWarnModal(false)}
        onConfirm={onDeleteOrder}
      />
    </>
  );
};
