import { Flex, Form, Input, Modal, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import styles from "./AddUserModal.module.scss";
import clsx from "clsx";
import { useAddUserMutation } from "../../store";

export const AddUserModal = ({ open, onCancel, title, position }) => {
  const [form] = useForm();
  const [addUser] = useAddUserMutation();

  const onFinish = (values) => {
    addUser({
      codeid: "0",
      nameid: values.nameid,
      phone: values.phone,
      login: values.login,
      password: values.password,
      code_sp_user_position: position === 2 ? "2" : "3",
      code_sp_filial: "1",
    });
    onCancel();
    form.resetFields();
  };

  const onClose = () => {
    onCancel();
    form.resetFields();
  };

  return (
    <Modal centered open={open} onCancel={onClose} footer={false}>
      <Typography.Title level={4}>Добавить {title}</Typography.Title>
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
