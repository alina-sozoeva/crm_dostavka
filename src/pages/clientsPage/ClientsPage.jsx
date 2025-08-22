import { Button, Flex, Input, Table } from "antd";

import styles from "./ClientsPage.module.scss";
import clsx from "clsx";

import { useMemo, useState } from "react";
import { useClientsColumns } from "./useClientsColumns";
import { useGetClientsQuery } from "../../store";
import { AddClientModal } from "./ui";
import { WarningModal } from "../../components";

export const ClientsPage = () => {
  const { data, isLoading } = useGetClientsQuery();
  const [openModal, setOpenModal] = useState(false);
  const [openWarnModal, setOpenWarnModal] = useState(false);

  const onOpenWarnModal = (guid) => {
    setOpenWarnModal(true);
  };

  const { columns } = useClientsColumns({ onOpenWarnModal });

  const filteredData = useMemo(() => {
    return data?.data.filter((item) => item.code_sp_user_position === 2);
  }, [data]);

  return (
    <main>
      <Flex gap="small" vertical className={clsx(styles.wrap)}>
        <Flex gap="small">
          <Input placeholder="Поиск" style={{ width: "300px" }} />
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
        title={"удалить курьера"}
        open={openWarnModal}
        onCancel={() => setOpenWarnModal(false)}
      />
    </main>
  );
};
