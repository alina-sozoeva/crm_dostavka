import { Flex, Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";

import styles from "./CancelModal.module.scss";
import clsx from "clsx";
import { WarningOutlined } from "@ant-design/icons";
import { useAddCommentMutation } from "../../store";

export const CancelModal = ({ open, onCancel, onConfirm, orderGuid }) => {
  const [form] = useForm();
  const [addComment] = useAddCommentMutation();
  const onClose = () => {
    onCancel();
    form.resetFields();
  };

  const onFinish = (value) => {
    onConfirm();
    addComment({
      cancel_comment: value.comment,
      guid_order: orderGuid,
    });
    onClose();
  };

  return (
    <Modal centered open={open} onCancel={onClose} footer={false} width={400}>
      <Flex vertical align="center" className={clsx("mb-4 gap-4")}>
        <WarningOutlined type="error" className={clsx(styles.icon)} />
        <span className={clsx("text-md font-bold")}>
          Вы действительно хотите отменить заказ?
        </span>
      </Flex>

      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Flex vertical gap="middle">
          <Form.Item
            name="comment"
            rules={[
              {
                required: true,
                message: "Это обязательное поле для заполнения!",
              },
            ]}
          >
            <Input.TextArea placeholder="Напишите причину отмены заказа" />
          </Form.Item>

          <Flex gap="small" justify="center">
            <button type="submit" className={clsx(styles.confirm)}>
              Подтвердить
            </button>
          </Flex>
        </Flex>
      </Form>
    </Modal>
  );
};
