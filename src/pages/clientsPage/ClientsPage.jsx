import { Button, Flex, Input, Table } from "antd";

import styles from "./ClientsPage.module.scss";
import clsx from "clsx";

import { useEffect, useMemo, useState } from "react";
import { useClientsColumns } from "./useClientsColumns";
import { useDeleteClientMutation, useGetClientsQuery } from "../../store";
import { AddClientModal, EditClientModal } from "./ui";
import { WarningModal } from "../../components";
import debounce from "lodash.debounce";
import { toast } from "react-toastify";

export const ClientsPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openWarnModal, setOpenWarnModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [search, setSearch] = useState();
  const { data, isLoading } = useGetClientsQuery({ search });
  const [record, setRecord] = useState();
  const [deleteClient] = useDeleteClientMutation();

  const onOpenWarnModal = (record) => {
    console.log(record, "record");
    setOpenWarnModal(true);
    setRecord(record);
  };

  const onOpenEditModal = (record) => {
    setOpenEditModal(true);
    setRecord(record);
  };

  const onConfirm = async () => {
    try {
      await deleteClient({ codeid: record?.codeid }).unwrap();

      toast.success("Клиент удален!");
    } catch (err) {
      toast.error(err.data?.error || "Ошибка сервера");
    }
  };

  const debouncedSetSearch = useMemo(
    () => debounce((value) => setSearch(value), 400),
    []
  );

  const handleSearchChange = (e) => {
    debouncedSetSearch(e.target.value);
  };

  const { columns } = useClientsColumns({ onOpenWarnModal, onOpenEditModal });

  useEffect(() => {
    return () => {
      debouncedSetSearch.cancel();
    };
  }, [debouncedSetSearch]);

  return (
    <main>
      <Flex gap="small" vertical className={clsx(styles.wrap)}>
        <Flex gap="small">
          <Input
            placeholder="Поиск"
            style={{ width: "300px" }}
            onChange={handleSearchChange}
          />
          <Button type="primary" onClick={() => setOpenModal(true)}>
            Добавить
          </Button>
        </Flex>
        <Table
          bordered
          loading={isLoading}
          columns={columns}
          dataSource={data?.data}
          rowKey="guid"
          scroll={{ x: 800 }}
          pagination={false}
        />
      </Flex>
      <AddClientModal open={openModal} onCancel={() => setOpenModal(false)} />
      <WarningModal
        title={"удалить клиента"}
        open={openWarnModal}
        onCancel={() => setOpenWarnModal(false)}
        onConfirm={onConfirm}
      />
      <EditClientModal
        open={openEditModal}
        onCancel={() => setOpenEditModal(false)}
        record={record}
      />
    </main>
  );
};
