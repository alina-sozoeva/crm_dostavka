import { Button, Flex, Input, Table } from "antd";
import { useCourierColumns } from "./useCourierColumns";
import styles from "./CourierPage.module.scss";
import clsx from "clsx";
import { useGetUsersQuery } from "../../store";
import { useMemo, useState } from "react";
import { AddCourierModal } from "../../components";
import { EditCourierModal } from "./ui";

export const CourierPage = () => {
  const { data, isLoading } = useGetUsersQuery();
  const [openModal, setOpenModal] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [codeid, setcodeid] = useState();

  const onUpdate = (codeid) => {
    setOpenUpdate(true);
    setcodeid(codeid);
  };

  const { columns } = useCourierColumns({ onUpdate });

  const filteredData = useMemo(() => {
    return data?.data.filter((item) => item.code_sp_user_position === 2);
  }, [data]);

  return (
    <main>
      <Flex gap="large" vertical className={clsx(styles.wrap)}>
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
        />
      </Flex>
      <AddCourierModal open={openModal} onCancel={() => setOpenModal(false)} />
      <EditCourierModal
        open={openUpdate}
        onCancel={() => setOpenUpdate(false)}
        codeid={codeid}
      />
    </main>
  );
};
