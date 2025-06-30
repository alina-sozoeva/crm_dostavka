import {
  Col,
  Divider,
  Flex,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Typography,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { useLocationsData } from "../../hooks";
import { useMemo, useState } from "react";
import styles from "./AddOrderModal.module.scss";
import clsx from "clsx";
import { toast } from "react-toastify";
import { useAddOrderMutation, useGetClientsQuery } from "../../store";
import dayjs from "dayjs";

export const AddOrderModal = ({ open, onCancel }) => {
  const [form] = useForm();
  const { countries, regions, cities } = useLocationsData();
  const [countryId, setCountryId] = useState();
  const [regionId, setRegionId] = useState();
  const [addOrder] = useAddOrderMutation();
  const { data: clients } = useGetClientsQuery();
  const [value, setValue] = useState();

  const mapCountries = useMemo(() => {
    return countries?.data?.map((item) => ({
      value: item.codeid,
      label: item.country_name,
    }));
  }, [countries]);

  const mapRegions = useMemo(() => {
    return regions?.data
      ?.filter((item) => item?.code_country === countryId)
      ?.map((item) => ({
        value: item.codeid,
        label: item.region_name,
      }));
  }, [regions, countryId]);

  const mapCities = useMemo(() => {
    return cities?.data
      ?.filter((item) => item.code_region === regionId)
      ?.map((item) => ({
        value: item.codeid,
        label: item.gorod_name,
      }));
  }, [cities, regionId]);

  const onClose = () => {
    onCancel();
    form.resetFields();
  };

  const onFinish = async (values) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_MAIN_URL}/utils/generate-guid`
      );
      const data = await response.json();
      const guid = data.guid;

      addOrder({
        guid: guid,
        code_user: 0,
        code_sp_client: 0,
        code_sp_courier: 0,
        status: 1,
        fio_from: values.fio_from,
        phone_from: values.phone_from,
        country_from: values.country_from,
        oblasty_from: values.oblasty_from,
        city_from: values.city_from,
        address_from: values.address_from,
        lon_from: 0,
        lat_from: 0,
        fio_to: values.fio_to,
        phone_to: values.phone_to,
        country_to: values.country_to,
        oblasty_to: values.oblasty_to,
        city_to: values.city_to,
        address_to: values.address_to,
        lon_to: 0,
        lat_to: 0,
        number_of_seats: 0,
        weight: 1,
        delivery_to_time: dayjs().format("MM-DD-YYYY"),
      });

      toast.success(<>Вы успешно добавили заказ!</>);
    } catch (err) {
      console.log("Ошибка валидации", err);
    }
  };

  console.log(value, "value");

  return (
    <Modal centered open={open} onCancel={onCancel} width={900} footer={false}>
      <Typography.Title level={4}>Добавить заказ</Typography.Title>
      <Divider className={clsx("m-2")} />
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Row gutter={24}>
          <Col span={12}>
            <Typography.Title level={5}>Отправитель</Typography.Title>

            <Form.Item
              label="Страна"
              name="country_from"
              className={clsx("w-full")}
              rules={[
                {
                  required: true,
                  message: "Это обязательное поле для заполнения!",
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Выберете страну отправителя"
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={mapCountries}
                onChange={(value) => setCountryId(value)}
              />
            </Form.Item>
            <Form.Item
              label="Область"
              name="oblasty_from"
              className={clsx("w-full")}
              rules={[
                {
                  required: true,
                  message: "Это обязательное поле для заполнения!",
                },
              ]}
            >
              <Select
                showSearch
                disabled={!countryId}
                placeholder="Выберете область отправителя"
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={mapRegions}
                onChange={(value) => setRegionId(value)}
              />
            </Form.Item>
            <Form.Item
              label="Город"
              name="city_from"
              className={clsx("w-full")}
              rules={[
                {
                  required: true,
                  message: "Это обязательное поле для заполнения!",
                },
              ]}
            >
              <Select
                showSearch
                disabled={!regionId}
                placeholder="Выберете город отправителя"
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={mapCities}
              />
            </Form.Item>
            <Form.Item
              label="Адрес"
              name="address_from"
              className={clsx("w-full")}
              rules={[
                {
                  required: true,
                  message: "Это обязательное поле для заполнения!",
                },
              ]}
            >
              <Input placeholder="Введите улицу, дом отправителя" />
            </Form.Item>
            <Flex gap="small">
              <Form.Item
                label="Телефон"
                name="phone_from"
                className={clsx("w-full")}
                rules={[
                  {
                    required: true,
                    message: "Это обязательное поле для заполнения!",
                  },
                ]}
              >
                <Input
                  placeholder="Введите телефон отправителя"
                  className={clsx("w-full")}
                />
              </Form.Item>
              <Form.Item
                label="ФИО"
                name="fio_from"
                className={clsx("w-full")}
                rules={[
                  {
                    required: true,
                    message: "Это обязательное поле для заполнения!",
                  },
                ]}
              >
                <Input
                  placeholder="Введите ФИО отправителя"
                  className={clsx("w-full")}
                />
              </Form.Item>
            </Flex>
          </Col>
          <Col span={12}>
            <Typography.Title level={5}>Получатель</Typography.Title>

            <Form.Item
              label="Страна"
              name="country_to"
              className={clsx("w-full")}
              rules={[
                {
                  required: true,
                  message: "Это обязательное поле для заполнения!",
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Выберете страну получателя"
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={mapCountries}
                onChange={(value) => setCountryId(value)}
              />
            </Form.Item>
            <Form.Item
              label="Область"
              name="oblasty_to"
              className={clsx("w-full")}
              rules={[
                {
                  required: true,
                  message: "Это обязательное поле для заполнения!",
                },
              ]}
            >
              <Select
                showSearch
                disabled={!countryId}
                placeholder="Выберете область получателя"
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={mapRegions}
                onChange={(value) => setRegionId(value)}
              />
            </Form.Item>
            <Form.Item
              label="Город"
              name="city_to"
              className={clsx("w-full")}
              rules={[
                {
                  required: true,
                  message: "Это обязательное поле для заполнения!",
                },
              ]}
            >
              <Select
                showSearch
                disabled={!regionId}
                placeholder="Выберете город получателя"
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={mapCities}
              />
            </Form.Item>
            <Form.Item
              label="Адрес"
              name="address_to"
              className={clsx("w-full")}
              rules={[
                {
                  required: true,
                  message: "Это обязательное поле для заполнения!",
                },
              ]}
            >
              <Input placeholder="Введите улицу, дом получателя" />
            </Form.Item>
            <Flex gap="small">
              <Form.Item
                label="Телефон"
                name="phone_to"
                className={clsx("w-full")}
                rules={[
                  {
                    required: true,
                    message: "Это обязательное поле для заполнения!",
                  },
                ]}
              >
                <Input
                  placeholder="Введите телефон получателя"
                  className={clsx("w-full")}
                />
              </Form.Item>
              <Form.Item
                label="ФИО"
                name="fio_to"
                className={clsx("w-full")}
                rules={[
                  {
                    required: true,
                    message: "Это обязательное поле для заполнения!",
                  },
                ]}
              >
                <Input
                  placeholder="Введите ФИО получателя"
                  className={clsx("w-full")}
                />
              </Form.Item>
            </Flex>
          </Col>
        </Row>
        <Flex gap="small" justify="center">
          <button type="submit" className={clsx(styles.confirm)}>
            Подтвердить
          </button>
          <button
            type="button"
            className={clsx(styles.cancel)}
            onClick={onClose}
          >
            Отмена
          </button>
        </Flex>
      </Form>
    </Modal>
  );
};
