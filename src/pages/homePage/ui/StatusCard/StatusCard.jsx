import { Button, Flex } from "antd";

import styles from "./StatusCard.module.scss";
import clsx from "clsx";
import { BsCashStack } from "react-icons/bs";

export const StatusCard = () => {
  return (
    <Flex gap="large" wrap="wrap">
      <Flex vertical gap="middle" className={clsx("")}>
        <h2 className={clsx("text-xl font-bold")}>Платежи за груз</h2>
        <Flex className={clsx(styles.card)}>
          <Flex vertical className={clsx(styles.card_item)}>
            <span className={clsx(styles.title)}>
              <BsCashStack /> Ожидают платежа
            </span>
            <span className={clsx(styles.count)}>34 000,00 сом</span>
          </Flex>

          <Flex vertical>
            <span className={clsx(styles.title)}>
              <BsCashStack /> Оплачено
            </span>
            <span className={clsx(styles.count)}>34 000,00 сом</span>
          </Flex>
        </Flex>
      </Flex>
      <Flex vertical gap="middle">
        <h2 className={clsx("text-xl font-bold")}>Информация о грузах</h2>
        <Flex className={clsx(styles.card)}>
          <Flex vertical className={clsx(styles.card_item)}>
            <span className={clsx(styles.title)}>
              <BsCashStack /> В пути к получателю
            </span>
            <span className={clsx(styles.count)}>100 машин</span>
          </Flex>

          <Flex vertical>
            <span className={clsx(styles.title)}>
              <BsCashStack /> Ожидает отправки
            </span>
            <span className={clsx(styles.count)}>50 машин</span>
          </Flex>
        </Flex>
      </Flex>
      <Flex vertical gap="middle">
        <h2 className={clsx("text-xl font-bold")}>Финансовая информация</h2>
        <Flex className={clsx(styles.card)}>
          <Flex vertical className={clsx(styles.card_item)}>
            <span className={clsx(styles.title)}>
              <BsCashStack /> Общая объем продаж
            </span>
            <span className={clsx(styles.count)}>344 500, 00 сом</span>
          </Flex>

          <Flex vertical className={clsx()}>
            <span className={clsx(styles.title)}>
              <BsCashStack /> Общий доход
            </span>
            <span className={clsx(styles.count)}>34 500, 00 сом</span>
          </Flex>

          {/* <Flex vertical>
            <span className={clsx(styles.title)}>
              <BsCashStack /> Общий расход
            </span>
            <span className={clsx(styles.count)}>14 500, 00 сом</span>
          </Flex> */}
        </Flex>
      </Flex>
    </Flex>
  );
};
