import { Button, Flex, Input, Table } from "antd";
// import { useCourierColumns } from "./useCourierColumns";
import styles from "./ClientsPage.module.scss";
import clsx from "clsx";
// import { useGetUsersQuery } from "../../store";
import { useMemo, useState } from "react";
import { useClientsColumns } from "./useClientsColumns";
import { useGetClientsQuery } from "../../store";
// import { AddCourierModal } from "../../components";

export const ClientsPage = () => {
  const { columns } = useClientsColumns();
  const { data, isLoading } = useGetClientsQuery();
  const [openModal, setOpenModal] = useState(false);

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
          dataSource={data?.data}
          rowKey="guid"
        />
      </Flex>
    </main>
  );
};
