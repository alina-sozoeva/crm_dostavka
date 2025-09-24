import { Button, DatePicker, Flex, Input, Table } from "antd";
import { useEffect, useMemo, useState } from "react";
import {
  useDeleteApplicationsMutation,
  useGetApplicationsQuery,
} from "../../store";

import { WarningModal } from "../../components";
import { useWindowSize } from "../../hooks";
import { toast } from "react-toastify";

import styles from "./ApplicationsPage.module.scss";
import clsx from "clsx";
import debounce from "lodash.debounce";
import { AddAppModal, EditAppModal } from "./ui";
import { useApplicationsColumns } from "./useApplicationsColumns";

export const ApplicationsPage = () => {
  const { data } = useGetApplicationsQuery({});
  const [remove] = useDeleteApplicationsMutation();

  console.log(data);

  const [openAdd, setOpenAdd] = useState(false);
  const [openWarm, setOpenWarm] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [record, setRecord] = useState();

  const { height: windowHeight } = useWindowSize();

  const tableHeight = useMemo(() => {
    const filterHeight = 150;
    const pagePadding = 100;
    const minHeight = 400;
    const maxHeight = 800;

    const availableHeight = windowHeight - filterHeight - pagePadding;
    return Math.max(minHeight, Math.min(availableHeight, maxHeight));
  }, [windowHeight]);

  const onUpdate = (record) => {
    setRecord(record);
    setOpenEdit(true);
  };

  const onOpenWarnModal = (record) => {
    setRecord(record);
    setOpenWarm(true);
  };

  const removeApp = () => {
    remove({
      guid: record?.guid,
    });
  };

  const { columns } = useApplicationsColumns({ onUpdate, onOpenWarnModal });

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
              // onChange={handleSearchChange}
            />
            <DatePicker placeholder="Выберите дату" />
            <Button
              className={clsx("")}
              type="primary"
              onClick={() => setOpenAdd(true)}
            >
              Добавить заявку
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <div className={clsx("")}>
        <Table
          bordered
          // loading={isLoading || isFetching}
          columns={columns}
          dataSource={data?.data}
          rowKey="guid"
          scroll={{ x: 1000, y: tableHeight }}
          pagination={false}
        />
      </div>
      <WarningModal
        title={"удалить заказ"}
        open={openWarm}
        onCancel={() => setOpenWarm(false)}
        onConfirm={removeApp}
      />
      <AddAppModal open={openAdd} onCancel={() => setOpenAdd(false)} />
      <EditAppModal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        record={record}
      />
    </>
  );
};
