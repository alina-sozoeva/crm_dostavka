import { Button, Flex, Input, Table } from "antd";
import styles from "./OperatorPage.module.scss";
import clsx from "clsx";
import { useDeleteUserMutation, useGetUsersQuery } from "../../store";
import { useEffect, useMemo, useState } from "react";

import debounce from "lodash.debounce";
import { toast } from "react-toastify";
import { AddUserModal, EditUserModal, WarningModal } from "../../components";
import { useOperatorColumns } from "./useOperatorColumns";

export const OperatorPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [codeid, setCodeid] = useState();
  const [openWarnModal, setOpenWarnModal] = useState(false);
  const [search, setSearch] = useState();
  const { data, isLoading } = useGetUsersQuery({ search });
  const [deleteUser] = useDeleteUserMutation();

  const debouncedSetSearch = useMemo(
    () => debounce((value) => setSearch(value), 400),
    []
  );

  const handleSearchChange = (e) => {
    debouncedSetSearch(e.target.value);
  };

  const onUpdate = (codeid) => {
    setOpenUpdate(true);
    setCodeid(codeid);
  };

  const onOpenWarnModal = (codeid) => {
    setOpenWarnModal(true);
    setCodeid(codeid);
  };

  const { columns } = useOperatorColumns({ onUpdate, onOpenWarnModal });

  const filteredData = useMemo(() => {
    return data?.data.filter((item) => item.code_sp_user_position === 3);
  }, [data]);

  const onConfirm = async () => {
    try {
      await deleteUser({ codeid: codeid }).unwrap();
      toast.success("Оператор удален!");
    } catch (err) {
      toast.error(err.data?.error || "Ошибка сервера");
    }
  };

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
          dataSource={filteredData}
          rowKey="guid"
          scroll={{ x: 800 }}
          pagination={false}
        />
      </Flex>
      <AddUserModal
        title={"оператора"}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        position={3}
      />
      <EditUserModal
        open={openUpdate}
        onCancel={() => setOpenUpdate(false)}
        codeid={codeid}
      />
      <WarningModal
        title={"удалить оператора"}
        open={openWarnModal}
        onCancel={() => setOpenWarnModal(false)}
        onConfirm={onConfirm}
      />
    </main>
  );
};
