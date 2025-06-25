import { Button, Flex, Input, Table } from "antd";
import { useCourierColumns } from "./useCourierColumns";
import styles from "./CourierPage.module.scss";
import clsx from "clsx";
import { useGetUsersQuery } from "../../store";
import { useMemo } from "react";

const courier = [
  {
    id: 1,
    fio: "Couriervich",
    order: 4,
    office: 800,
    delivery: 1800,
  },
  {
    id: 2,
    fio: "Testov 3",
    order: 4,
    office: 8000,
    delivery: 18000,
  },
];

export const CourierPage = () => {
  const { columns } = useCourierColumns();

  const { data, isLoading } = useGetUsersQuery();

  const filteredData = useMemo(() => {
    return data?.data.filter((item) => item.codeid === "2");
  }, [data]);

  return (
    <main>
      <Flex gap="large" vertical className={clsx(styles.wrap)}>
        <Flex gap="small">
          <Input placeholder="Поиск" style={{ width: "300px" }} />
          <Button type="primary">Добавить</Button>
        </Flex>
        <Table
          bordered
          loading={isLoading}
          columns={columns}
          dataSource={filteredData}
          rowKey="guid"
        />
      </Flex>
    </main>
  );
};
