import { Flex, Form, Input, Modal, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import styles from "./AddCourierModal.module.scss";
import clsx from "clsx";
import { useAddUserMutation } from "../../store";

export const AddCourierModal = ({ open, onCancel }) => {
  const [form] = useForm();
  const [addUser] = useAddUserMutation();

  const onFinish = (values) => {
    addUser({
      codeid: "0",
      nameid: values.nameid,
      phone: values.nameid,
      login: values.nameid,
      password: values.nameid,
      code_sp_user_position: "2",
      code_sp_filial: "2",
    });
    onCancel();
    form.resetFields();
  };

  const onClose = () => {
    onCancel();
    form.resetFields();
  };

  return (
    <Modal centered open={open} onCancel={onCancel} footer={false}>
      <Typography.Title level={4}>Добавить курьера</Typography.Title>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          label="ФИО курьера"
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
          label="Логин курьера"
          name="login"
          rules={[
            {
              required: true,
              message: "Это обязательное поле для заполнения!",
            },
          ]}
        >
          <Input placeholder="Введите логин курьера" />
        </Form.Item>
        <Form.Item
          label="Пароль курьера"
          name="password"
          rules={[
            {
              required: true,
              message: "Это обязательное поле для заполнения!",
            },
          ]}
        >
          <Input.Password placeholder="Введите пароль курьера" />
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
