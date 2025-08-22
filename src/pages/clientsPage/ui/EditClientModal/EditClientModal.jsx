import { useForm } from "antd/es/form/Form";
import { useUpdateClientMutation } from "../../../../store";
import { Flex, Form, Input, Modal, Typography } from "antd";
import styles from "./EditClientModal.module.scss";
import clsx from "clsx";
import { useEffect } from "react";

export const EditClientModal = ({ open, onCancel, record }) => {
  const [form] = useForm();
  const [updateClient] = useUpdateClientMutation();

  console.log(record, "record");

  const onFinish = (values) => {
    updateClient({
      codeid: record?.codeid,
      code_sp_user_position: record.code_sp_user_position,
      inn: values.inn,
      nameid: values.nameid,
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
  };

  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        codeid: record.codeid,
        nameid: record.nameid,
        inn: record.inn,
        phone: record.phone,
        login: record.login,
        email: record.email,
        password: record.password,
        code_sp_user_position: record.code_sp_user_position,
      });
    }
  }, [record, form, open]);

  return (
    <Modal centered open={open} onCancel={onClose} footer={false}>
      <Typography.Title level={4}>Редактировать</Typography.Title>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        {record?.code_sp_type_client === 2 && (
          <Form.Item
            label="ИНН"
            name="inn"
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
          label="ФИО клиента"
          name="nameid"
          rules={[
            {
              required: true,
              message: "Это обязательное поле для заполнения!",
            },
          ]}
        >
          <Input placeholder="Введите ФИО" />
        </Form.Item>
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
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Это обязательное поле для заполнения!",
            },
          ]}
        >
          <Input placeholder="Введите email" />
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
        </Flex>
      </Form>
    </Modal>
  );
};
