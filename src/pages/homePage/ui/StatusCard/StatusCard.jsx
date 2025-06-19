import { Flex } from "antd";
import { BsCashStack } from "react-icons/bs";
import styles from "./StatusCard.module.scss";
import clsx from "clsx";

const statusItems = [
  {
    id: 1,
    count: "34 000,00 ",
    title: "Ожидают платежа",
  },
  {
    id: 2,
    count: "1 000,00 ",
    title: "Ожидают ",
  },
  {
    id: 3,
    count: "3 400,00 ",
    title: "платежа",
  },
  {
    id: 4,
    count: "34 000,00 ",
    title: "Ожидают",
  },
  {
    id: 4,
    count: "342 000,00 ",
    title: "Ожидают платежа",
  },
  {
    id: 5,
    count: "324 000,00 ",
    title: "платежа",
  },
];

export const StatusCard = () => {
  return (
    <>
      {statusItems.map((item) => (
        <Flex vertical gap="middle" key={item.id}>
          <Flex align="center" className={clsx(styles.card)}>
            <span className={clsx(clsx(styles.icon))}>
              <BsCashStack />
            </span>

            <Flex vertical>
              <span className={clsx(styles.count)}>{item.count} сом</span>
              <span className={clsx(styles.title)}>{item.title}</span>
            </Flex>
          </Flex>
        </Flex>
      ))}
    </>
  );
};
