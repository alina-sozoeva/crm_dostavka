import { Button, Flex, Input, Table } from "antd";
import { useCourierColumns } from "./useCourierColumns";
import styles from "./CourierPage.module.scss";
import clsx from "clsx";
import { useGetUsersQuery } from "../../store";
import { useMemo, useState } from "react";
import { AddCourierModal, WarningModal } from "../../components";
import { EditCourierModal } from "./ui";

export const CourierPage = () => {
  const { data, isLoading } = useGetUsersQuery();
  const [openModal, setOpenModal] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [codeid, setcodeid] = useState();
  const [openWarnModal, setOpenWarnModal] = useState(false);
  const [search, setSearch] = useState();

  const onUpdate = (codeid) => {
    setOpenUpdate(true);
    setcodeid(codeid);
  };

  const onOpenWarnModal = (guid) => {
    setOpenWarnModal(true);
  };

  const { columns } = useCourierColumns({ onUpdate, onOpenWarnModal });

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
          dataSource={filteredData}
          rowKey="guid"
          scroll={{ x: 800 }}
          pagination={false}
        />
      </Flex>
      <AddCourierModal open={openModal} onCancel={() => setOpenModal(false)} />
      <EditCourierModal
        open={openUpdate}
        onCancel={() => setOpenUpdate(false)}
        codeid={codeid}
      />
      <WarningModal
        title={"удалить курьера"}
        open={openWarnModal}
        onCancel={() => setOpenWarnModal(false)}
      />
    </main>
  );
};
