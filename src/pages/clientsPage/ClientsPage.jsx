import { Button, Flex, Input, Table } from "antd";

import styles from "./ClientsPage.module.scss";
import clsx from "clsx";

import { useMemo, useState } from "react";
import { useClientsColumns } from "./useClientsColumns";
import { useGetClientsQuery } from "../../store";
import { AddClientModal, EditClientModal } from "./ui";
import { WarningModal } from "../../components";
import debounce from "lodash.debounce";

export const ClientsPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openWarnModal, setOpenWarnModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [search, setSearch] = useState();
  const { data, isLoading } = useGetClientsQuery({ search });
  const [record, setRecordd] = useState();

  const onOpenWarnModal = (guid) => {
    setOpenWarnModal(true);
  };

  const onOpenEditModal = (record) => {
    setOpenEditModal(true);
    setRecordd(record);
  };

  const debouncedSetSearch = useMemo(
    () => debounce((value) => setSearch(value), 400),
    []
  );

  const handleSearchChange = (e) => {
    debouncedSetSearch(e.target.value);
  };

  const { columns } = useClientsColumns({ onOpenWarnModal, onOpenEditModal });

  const filteredData = useMemo(() => {
    return data?.data.filter((item) => item.code_sp_user_position === 2);
  }, [data]);

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
      />
      <EditClientModal
        open={openEditModal}
        onCancel={() => setOpenEditModal(false)}
        record={record}
      />
    </main>
  );
};
