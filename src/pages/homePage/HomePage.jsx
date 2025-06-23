import clsx from "clsx";
import { Col, Flex, Row } from "antd";
import { AreaGraf, BarGraf, OrderCard } from "./ui";
import { useNavigate } from "react-router-dom";
import { pathName } from "../../enums";
import styles from "./HomePage.module.scss";
import { useGetOrdersQuery } from "../../store";
import { CustomMap } from "../../components";

const items = [
  {
    guid: "9AF06061-0A69-4AE0-85FE-EFCE356FDB0E",
    date_system: "2025-06-18T15:25:41.617Z",
    deleted: 0,
    code_user: 1,
    status: 0,
    fio_from: "Никита",
    phone_from: "+996557501101",
    email_from: "",
    address_from: "Джантошева 97А",
    lon_from: 0,
    lat_from: 0,
    fio_to: "Никита2",
    phone_to: "+996557501101",
    email_to: "",
    address_to: "Джантошева 97",
    lon_to: 0,
    lat_to: 0,
    number_of_seats: 0,
    weight: 1,
    total_weight: 0,
    summa: null,
    delivery_to_time: "2025-06-18T14:30:00.000Z",
    nameid_sp_client: null,
    code_sp_client: 0,
    nameid_sp_courier: null,
    code_sp_courier: 0,
    nameid_country_from: "Кыргызстан",
    nameid_oblasty_from: "Чуйская",
    nameid_city_from: "Бишкек",
    city_from: 1,
    nameid_code_user: "Админ",
    country_from: 1,
    oblasty_from: 1,
    country_name: "Кыргызстан",
    nameid_country_name: 1,
    nameid_oblasty_to: "Чуйская",
    oblasty_to: 1,
    nameid_city_to: "Бишкек",
    city_to: 1,
  },
  {
    guid: "9AF06061-0A69-4AE0-85FE-EFCE356FDB0E",
    date_system: "2025-06-18T15:25:41.617Z",
    deleted: 0,
    code_user: 1,
    status: 0,
    fio_from: "Никита",
    phone_from: "+996557501101",
    email_from: "",
    address_from: "Джантошева 97А",
    lon_from: 0,
    lat_from: 0,
    fio_to: "Никита2",
    phone_to: "+996557501101",
    email_to: "",
    address_to: "Джантошева 97",
    lon_to: 0,
    lat_to: 0,
    number_of_seats: 0,
    weight: 1,
    total_weight: 0,
    summa: null,
    delivery_to_time: "2025-06-18T14:30:00.000Z",
    nameid_sp_client: null,
    code_sp_client: 0,
    nameid_sp_courier: null,
    code_sp_courier: 0,
    nameid_country_from: "Кыргызстан",
    nameid_oblasty_from: "Чуйская",
    nameid_city_from: "Бишкек",
    city_from: 1,
    nameid_code_user: "Админ",
    country_from: 1,
    oblasty_from: 1,
    country_name: "Кыргызстан",
    nameid_country_name: 1,
    nameid_oblasty_to: "Чуйская",
    oblasty_to: 1,
    nameid_city_to: "Бишкек",
    city_to: 1,
  },
  {
    guid: "9AF06061-0A69-4AE0-85FE-EFCE356FDB0E",
    date_system: "2025-06-18T15:25:41.617Z",
    deleted: 0,
    code_user: 1,
    status: 0,
    fio_from: "Никита",
    phone_from: "+996557501101",
    email_from: "",
    address_from: "Джантошева 97А",
    lon_from: 0,
    lat_from: 0,
    fio_to: "Никита2",
    phone_to: "+996557501101",
    email_to: "",
    address_to: "Джантошева 97",
    lon_to: 0,
    lat_to: 0,
    number_of_seats: 0,
    weight: 1,
    total_weight: 0,
    summa: null,
    delivery_to_time: "2025-06-18T14:30:00.000Z",
    nameid_sp_client: null,
    code_sp_client: 0,
    nameid_sp_courier: null,
    code_sp_courier: 0,
    nameid_country_from: "Кыргызстан",
    nameid_oblasty_from: "Чуйская",
    nameid_city_from: "Бишкек",
    city_from: 1,
    nameid_code_user: "Админ",
    country_from: 1,
    oblasty_from: 1,
    country_name: "Кыргызстан",
    nameid_country_name: 1,
    nameid_oblasty_to: "Чуйская",
    oblasty_to: 1,
    nameid_city_to: "Бишкек",
    city_to: 1,
  },
  {
    guid: "9AF06061-0A69-4AE0-85FE-EFCE356FDB0E",
    date_system: "2025-06-18T15:25:41.617Z",
    deleted: 0,
    code_user: 1,
    status: 0,
    fio_from: "Никита",
    phone_from: "+996557501101",
    email_from: "",
    address_from: "Джантошева 97А",
    lon_from: 0,
    lat_from: 0,
    fio_to: "Никита2",
    phone_to: "+996557501101",
    email_to: "",
    address_to: "Джантошева 97",
    lon_to: 0,
    lat_to: 0,
    number_of_seats: 0,
    weight: 1,
    total_weight: 0,
    summa: null,
    delivery_to_time: "2025-06-18T14:30:00.000Z",
    nameid_sp_client: null,
    code_sp_client: 0,
    nameid_sp_courier: null,
    code_sp_courier: 0,
    nameid_country_from: "Кыргызстан",
    nameid_oblasty_from: "Чуйская",
    nameid_city_from: "Бишкек",
    city_from: 1,
    nameid_code_user: "Админ",
    country_from: 1,
    oblasty_from: 1,
    country_name: "Кыргызстан",
    nameid_country_name: 1,
    nameid_oblasty_to: "Чуйская",
    oblasty_to: 1,
    nameid_city_to: "Бишкек",
    city_to: 1,
  },
];

export const HomePage = () => {
  const navigate = useNavigate();
  const onOrder = () => {
    navigate(`${pathName.orders}`);
  };

  const { data } = useGetOrdersQuery();

  return (
    <main className={clsx("flex flex-col gap-10 w-full h-full")}>
      {/* <Flex gap="large" wrap="wrap">
        <StatusCard />
      </Flex> */}
      <Row gutter={24} className={clsx("w-full h-full")}>
        <Col span={16}>
          <Flex vertical gap="middle" className={clsx(" w-full h-full")}>
            <div className="wrap">
              <AreaGraf />
            </div>

            {/* <Flex vertical gap="large" className={clsx("w-full h-full")}> */}
            <div className={clsx("wrap w-full h-full")}>
              {/* <CustomMap height={"320"} /> */}
              <BarGraf />
            </div>
            {/* </Flex> */}
          </Flex>
        </Col>
        <Col span={8} className={clsx("wrap w-full h-full")}>
          <h3 className={clsx("text-xl font-bold mb-2")}>Заказы</h3>
          <div className="h-[70vh] p-2 flex flex-col gap-3 overflow-y-auto ">
            {data?.data?.map((item) => (
              <OrderCard key={item?.guid} item={item} />
            ))}
          </div>
        </Col>
      </Row>
    </main>
  );
};
