import { Checkbox, Flex, Form, Input, Modal, Select, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import { useAddApplicationMutation, useGetUsersQuery } from "../../../../store";
import styles from "./AddAppModal.module.scss";
import clsx from "clsx";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

export const AddAppModal = ({ open, onCancel }) => {
  const [form] = useForm();
  const { data: users } = useGetUsersQuery({});
  const [add] = useAddApplicationMutation();
  const userId = useSelector((state) => state.user.userId);

  const [checkedUr, setCheckedUr] = useState(false);
  const [checkedFiz, setCheckedFiz] = useState(true);

  const [checkedDoc, setCheckedDoc] = useState(true);
  const [checkedPac, setCheckedPac] = useState(false);

  const onChangeUr = (e) => {
    setCheckedUr(e.target.checked);
    setCheckedFiz(false);
  };

  const onChangeFiz = (e) => {
    setCheckedFiz(e.target.checked);
    setCheckedUr(false);
  };

  const onCheckedDoc = (e) => {
    setCheckedDoc(e.target.checked);
    setCheckedPac(false);
  };

  const onCheckedPac = (e) => {
    setCheckedPac(e.target.checked);
    setCheckedDoc(false);
  };

  const onFinish = async (values) => {
    console.log(values, "values");

    const response = await fetch(
      `${process.env.REACT_APP_MAIN_URL}/utils/generate-guid`
    );
    const data = await response.json();
    const guid = data.guid;

    add({
      guid: guid,
      code_user: userId,
      status: 2,
      nameid: checkedUr ? values.nameid_ur : values.nameid_fiz,
      phone: values.phone,
      weight: values.weight,
      number_of_seats: values.number_of_seats,
      code_sp_courier: values.code_sp_courier,
      code_sp_type_client: checkedUr ? 2 : 1,
      delivery_type: checkedDoc ? 1 : 2,
      address_to: values.address_to,
    });

    onCancel();
    form.resetFields();
  };

  const onClose = () => {
    onCancel();
    form.resetFields();
    setCheckedFiz(true);
    setCheckedUr(false);
  };

  const filteredUsers = useMemo(() => {
    return users?.data
      .filter((item) => item.code_sp_user_position === 2)
      .map((item) => ({
        label: item.nameid,
        value: item.codeid,
      }));
  }, [users]);

  return (
    <Modal centered open={open} onCancel={onClose} footer={false} width={500}>
      <Typography.Title level={4}>Добавить заявку</Typography.Title>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Flex
          className={clsx(styles.form_general, "my-2")}
          gap="small"
          align="center"
          vertical
        >
          <Flex className={clsx(styles.checked_wrap)}>
            <Checkbox
              className={clsx(checkedFiz && styles.checked, styles.check)}
              checked={checkedFiz}
              onChange={onChangeFiz}
            >
              Физ. лицо
            </Checkbox>
            <Checkbox
              className={clsx(checkedUr && styles.checked, styles.check)}
              checked={checkedUr}
              onChange={onChangeUr}
            >
              Юр. лицо
            </Checkbox>
          </Flex>
        </Flex>
        {checkedUr && (
          <Form.Item
            name="nameid_ur"
            label="Наименование"
            rules={[
              {
                required: true,
                message: "Это обязательное поле для заполнения!",
              },
            ]}
          >
            <Input placeholder="Введите наименование" />
          </Form.Item>
        )}
        {checkedFiz && (
          <Form.Item
            name="nameid_fiz"
            label="ФИО"
            rules={[
              {
                required: true,
                message: "Это обязательное поле для заполнения!",
              },
            ]}
          >
            <Input placeholder="Введите ФИО" />
          </Form.Item>
        )}

        <Form.Item
          label="Номер телефона"
          name="phone"
          rules={[
            {
              required: true,
              message: "Это обязательное поле для заполнения!",
            },
          ]}
        >
          <Input placeholder="Введите номер телефона" />
        </Form.Item>
        <Flex gap="small" align="center">
          <Form.Item label="Тип" name="delivery_type">
            <Flex>
              <Checkbox checked={checkedDoc} onChange={onCheckedDoc}>
                Документы
              </Checkbox>
              <Checkbox checked={checkedPac} onChange={onCheckedPac}>
                Посылка
              </Checkbox>
            </Flex>
          </Form.Item>

          <Form.Item
            label="Вес"
            name="weight"
            rules={[
              {
                required: true,
                message: "Это обязательное поле для заполнения!",
              },
            ]}
          >
            <Input placeholder="Введите вес закза" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Места"
            name="number_of_seats"
            rules={[
              {
                required: true,
                message: "Это обязательное поле для заполнения!",
              },
            ]}
          >
            <Input placeholder="Введите кол-во мест" />
          </Form.Item>
        </Flex>
        <Form.Item
          name="address_to"
          label="Куда"
          rules={[
            {
              required: true,
              message: "Это обязательное поле для заполнения!",
            },
          ]}
        >
          <Input placeholder="Введите адрес" />
        </Form.Item>

        <Form.Item
          label="Курьер"
          name="code_sp_courier"
          rules={[
            {
              required: true,
              message: "Это обязательное поле для заполнения!",
            },
          ]}
        >
          <Select
            allowClear
            showSearch
            placeholder="Выберите курьера"
            style={{ width: "100%" }}
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={filteredUsers}
            // onChange={(value) => setCourierId(value)}
          />
        </Form.Item>
        <Flex gap="small" justify="center">
          <button type="submit" className={clsx(styles.confirm)}>
            Подтвердить
          </button>
        </Flex>
      </Form>
    </Modal>
  );
};
