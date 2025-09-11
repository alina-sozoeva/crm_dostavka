import { useForm } from "antd/es/form/Form";

import { Flex, Form, Input, Modal, Typography } from "antd";
import { useEffect } from "react";
import { useGetUsersQuery, useUpdateUserMutation } from "../../store";

import styles from "./EditUserModal.module.scss";
import clsx from "clsx";

export const EditUserModal = ({ title, open, onCancel, codeid }) => {
  const [form] = useForm();
  const [updateUser] = useUpdateUserMutation();
  const { data } = useGetUsersQuery({ codeid });

  const findUser = data?.data[0];

  const onFinish = (values) => {
    updateUser({
      codeid: codeid,
      nameid: values.nameid,
      phone: values.phone,
      login: values.login,
      password: values.password,
      code_sp_user_position: findUser.code_sp_user_position,
      code_sp_filial: findUser.code_sp_filial,
    });
    onCancel();
    form.resetFields();
  };

  const onClose = () => {
    onCancel();
    form.resetFields();
  };

  useEffect(() => {
    if (findUser) {
      form.setFieldsValue({
        codeid: codeid,
        nameid: findUser.nameid,
        phone: findUser.phone,
        login: findUser.login,
        password: findUser.password,
        code_sp_user_position: findUser.code_sp_user_position,
        code_sp_filial: findUser.code_sp_filial,
      });
    }
  }, [findUser, form, open, codeid]);

  return (
    <Modal centered open={open} onCancel={onClose} footer={false}>
      <Typography.Title level={4}>Редактировать</Typography.Title>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          label={`ФИО ${title}`}
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
          label={`Логин ${title}`}
          name="login"
          rules={[
            {
              required: true,
              message: "Это обязательное поле для заполнения!",
            },
          ]}
        >
          <Input placeholder={`Введите логин ${title}`} />
        </Form.Item>
        <Form.Item
          label={`Пароль ${title}`}
          name="password"
          rules={[
            {
              required: true,
              message: "Это обязательное поле для заполнения!",
            },
          ]}
        >
          <Input.Password placeholder={`Введите пароль ${title}`} />
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
