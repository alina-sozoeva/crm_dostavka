import { Button, Flex, Slider } from "antd";

import styles from "./OrderCard.module.scss";
import clsx from "clsx";
import dayjs from "dayjs";

import utc from "dayjs/plugin/utc";
import {
  ClockCircleFilled,
  EnvironmentOutlined,
  GlobalOutlined,
  TruckFilled,
} from "@ant-design/icons";
import { order_status_short } from "../../../../enums";

dayjs.extend(utc);

export const OrderCard = ({ item }) => {
  const onChange = (value) => {
    console.log("onChange: ", value);
  };

  const onChangeComplete = (value) => {
    console.log("onChangeComplete: ", value);
  };
  return (
    <Flex key={item?.guid} vertical gap="small" className={clsx(styles.card)}>
      <Flex gap="large" align="center">
        <span className={clsx("font-bold")}>{item.tracking_number}</span>
        <button className={clsx(styles.btn)}>
          {order_status_short[Number(item.status)]}
        </button>
      </Flex>
      <Flex>
        <span>
          <EnvironmentOutlined className={clsx("mr-2")} />
          {item.nameid_oblasty_from} обл., {item.nameid_city_from},{" "}
          {item.address_from} - {item.nameid_oblasty_to} обл.,{" "}
          {item.nameid_city_to}, {item.address_to}
        </span>
      </Flex>
      <Flex>
        <span>
          <ClockCircleFilled className={clsx("mr-2")} />
          {dayjs.utc(item.delivery_to_time).format("DD.MM.YYYY HH:mm")}
        </span>
      </Flex>
      <Flex vertical>
        <Flex justify="space-between">
          <span>Пройдено пути</span>
          <span>60%</span>
        </Flex>
        <Slider
          defaultValue={30}
          onChange={onChange}
          onChangeComplete={onChangeComplete}
        />
      </Flex>

      <Flex gap="large">
        <span>
          <GlobalOutlined className={clsx("mr-2")} />
          Компания
        </span>
        <span>
          <TruckFilled /> 97% приедет вовремя
        </span>
      </Flex>
    </Flex>
  );
};
