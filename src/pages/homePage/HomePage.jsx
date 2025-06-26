import clsx from "clsx";
import { Col, Flex, Row } from "antd";
import { AreaGraf, BarGraf, OrderCard } from "./ui";
import { useNavigate } from "react-router-dom";

import { useGetOrdersQuery } from "../../store";
import styles from "./HomePage.module.scss";

export const HomePage = () => {
  const navigate = useNavigate();
  const { data } = useGetOrdersQuery();

  return (
    <main className={clsx("flex flex-col gap-10 w-full h-full")}>
      <Row gutter={24} className={clsx("w-full h-full")}>
        <Col span={16}>
          <Flex vertical gap="middle" className={clsx(" w-full h-full")}>
            <div className="wrap">
              <AreaGraf />
            </div>

            <div className={clsx("wrap w-full h-full")}>
              <BarGraf />
            </div>
          </Flex>
        </Col>
        <Col span={8} className={clsx("wrap w-full h-full")}>
          <Flex className={clsx("mb-2")} justify="space-between">
            <h3 className={clsx("text-xl font-bold")}>Заказы</h3>
            <a onClick={() => navigate("/orders")}>Смотреть все заказы</a>
          </Flex>

          <div className="h-[70vh] p-2 flex flex-col gap-3 overflow-y-auto ">
            {data?.data?.slice(0, 4).map((item) => (
              <OrderCard key={item?.guid} item={item} />
            ))}
          </div>
        </Col>
      </Row>
    </main>
  );
};
