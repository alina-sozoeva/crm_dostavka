import clsx from "clsx";
import { Flex } from "antd";
import { BarGraf, StatusCard } from "./ui";
import { useNavigate } from "react-router-dom";
import { pathName } from "../../enums";
import styles from "./HomePage.module.scss";

export const HomePage = () => {
  const navigate = useNavigate();
  const onOrder = () => {
    navigate(`${pathName.orders}`);
  };

  return (
    <main className={clsx("")}>
      <div className={clsx("mb-10")}>
        <StatusCard />
      </div>
      <Flex>
        <Flex align="start" vertical gap="middle">
          <BarGraf />
          <Flex>{/* <PieGraf /> */}</Flex>
        </Flex>
      </Flex>
    </main>
  );
};
