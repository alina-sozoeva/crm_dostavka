import {
  Button,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Typography,
} from "antd";
import { useForm } from "antd/es/form/Form";
import clsx from "clsx";

export const OrderModal = ({ open, onCancel }) => {
  const [from] = useForm();

  const onFinish = () => {
    console.log("!");
  };

  return (
    <Modal centered open={open} onCancel={onCancel} width={600} footer={false}>
      <Typography.Title level={4}>Добавить</Typography.Title>
      <Form layout="vertical" name="order" form={from} onFinish={onFinish}>
        <Form.Item
          label="Клиент"
          name="client"
          rules={[
            {
              required: true,
              message: "Это обязательноу поле для заполнения",
            },
          ]}
        >
          <Input placeholder="Клиент" />
        </Form.Item>
        <Form.Item
          label="Курьер"
          name="courier"
          rules={[
            {
              required: true,
              message: "Это обязательноу поле для заполнения",
            },
          ]}
        >
          <Input placeholder="Курьер" />
        </Form.Item>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Откуда"
              name="from"
              rules={[
                {
                  required: true,
                  message: "Это обязательноу поле для заполнения",
                },
              ]}
            >
              <Select
                placeholder="Откуда"
                options={[
                  { value: "test", label: "test" },
                  { value: "test1", label: "test1" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Куда"
              name="to"
              rules={[
                {
                  required: true,
                  message: "Это обязательноу поле для заполнения",
                },
              ]}
            >
              <Select
                placeholder="Куда"
                options={[
                  { value: "test", label: "test" },
                  { value: "test1", label: "test1" },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Дата/время"
              name="date"
              rules={[
                {
                  required: true,
                  message: "Это обязательноу поле для заполнения",
                },
              ]}
            >
              <DatePicker placeholder="Дата/время" className={clsx("w-full")} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Сумма"
              name="sum"
              rules={[
                {
                  required: true,
                  message: "Это обязательноу поле для заполнения",
                },
              ]}
            >
              <Input placeholder="Сумма" />
            </Form.Item>
          </Col>
        </Row>

        <Flex justify="end" gap="small">
          <Button danger>Отмена</Button>
          <Button type="dashed">Добавить в ЧС</Button>
          <Button type="primary">Сохранить</Button>
        </Flex>
      </Form>
    </Modal>
  );
};
