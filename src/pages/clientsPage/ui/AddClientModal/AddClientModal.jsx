import { Checkbox, Flex, Form, Input, Modal, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import { useAddClientMutation } from "../../../../store";
import styles from "./AddClientModal.module.scss";
import clsx from "clsx";
import { useState } from "react";

export const AddClientModal = ({ open, onCancel }) => {
  const [form] = useForm();
  const [addClient] = useAddClientMutation();
  const [checkedUr, setCheckedUr] = useState(false);
  const [checkedFiz, setCheckedFiz] = useState(true);

  const onChangeUr = (e) => {
    setCheckedUr(e.target.checked);
    setCheckedFiz(false);
  };

  const onChangeFiz = (e) => {
    setCheckedFiz(e.target.checked);
    setCheckedUr(false);
  };

  const onFinish = (values) => {
    addClient({
      codeid: "",
      code_sp_type_client: checkedUr ? 2 : 1,
      inn: values.inn || "",
      nameid: values.nameid_ur || values.nameid_fiz,
      phone: values.phone,
      email: values.email,
      login: values.login,
      password: values.password,
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

  return (
    <Modal centered open={open} onCancel={onClose} footer={false}>
      <Typography.Title level={4}>Добавить клиента</Typography.Title>
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
        {checkedUr && (
          <Form.Item
            name="inn"
            label="ИНН"
            rules={[
              {
                required: true,
                message: "Это обязательное поле для заполнения!",
              },
            ]}
          >
            <Input placeholder="Введите ИНН" />
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
        <Form.Item
          label="Email клиента"
          name="email"
          rules={[
            {
              required: true,
              message: "Это обязательное поле для заполнения!",
            },
          ]}
        >
          <Input placeholder="Введите email клиента" />
        </Form.Item>
        <Form.Item
          label="Логин клиента"
          name="login"
          rules={[
            {
              required: true,
              message: "Это обязательное поле для заполнения!",
            },
          ]}
        >
          <Input placeholder="Введите логин клиента" />
        </Form.Item>
        <Form.Item
          label="Пароль клиента"
          name="password"
          rules={[
            {
              required: true,
              message: "Это обязательное поле для заполнения!",
            },
          ]}
        >
          <Input.Password placeholder="Введите пароль клиента" />
        </Form.Item>

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
