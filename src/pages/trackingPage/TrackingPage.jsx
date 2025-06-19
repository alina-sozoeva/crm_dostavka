import { Flex, Select } from "antd";
import clsx from "clsx";
import { CustomMap } from "../../components";

const statuses = [
  { key: "all", label: <span>Все (99)</span> },
  { key: "exception", label: <span>Исключения (3)</span> },
  { key: "failed_attempt", label: <span>Неудачная попытка (1)</span> },
  { key: "expired", label: <span>Истёк срок (6)</span> },
  { key: "out_for_delivery", label: <span>В пути к получателю (0)</span> },
  { key: "delivered", label: <span>Доставлено (70)</span> },
  { key: "pending", label: <span>Ожидает отправки (11)</span> },
];

export const TrackingPage = () => {
  return (
    <Flex vertical gap="middle" className={clsx("w-full h-full")}>
      <Select
        options={statuses}
        placeholder="Курьер"
        style={{ width: "200px" }}
      />

      <CustomMap />
    </Flex>
  );
};
