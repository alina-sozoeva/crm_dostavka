import { useForm } from "antd/es/form/Form";
import { Button, Flex, Form, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./LoginPage.module.scss";
import fon from "../../assets/images/27059.jpg";
import clsx from "clsx";
import { useLoginUserMutation } from "../../store";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [form] = useForm();
  const [login] = useLoginUserMutation();

  const onFinish = async (values) => {
    try {
      await login({
        login: values.login,
        password: values.password,
      }).unwrap();

      form.resetFields();
      navigate("/");
    } catch (error) {
      if (error.status === 401) {
        toast.error("Неверный пароль или логин!");
      } else {
        toast.error("Произошла ошибка, попробуйте позже");
      }
    }
  };

  return (
    <section className={clsx(styles.wrap)}>
      <div>
        <img src={fon} alt={fon} className={clsx(styles.img)} />
      </div>
      <div className={clsx(styles.form)}>
        <Typography.Title
          level={3}
          className={clsx("text-center flex items-center justify-center")}
        >
          Войти
        </Typography.Title>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            name="login"
            label="Логин"
            rules={[
              {
                required: true,
                message: "Это обязательное поле для заполнения!",
              },
            ]}
          >
            <Input placeholder="Введите логин" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Пароль"
            rules={[
              {
                required: true,
                message: "Это обязательное поле для заполнения!",
              },
            ]}
          >
            <Input.Password placeholder="Введите логин" />
          </Form.Item>
          <Flex justify="center">
            <Button type="primary" htmlType="submit">
              Войти
            </Button>
          </Flex>
        </Form>
      </div>
    </section>
  );
};
