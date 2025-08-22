import { Flex, Form, Input, Modal, Select } from "antd";
import { useForm } from "antd/es/form/Form";

import styles from "./AssignCourier.module.scss";
import clsx from "clsx";
import { WarningOutlined } from "@ant-design/icons";
import { useAddCommentMutation } from "../../store";

export const AssignCourier = ({ open, onCancel, onUpdateStatus, guid }) => {
  const [form] = useForm();

  const onClose = () => {
    onCancel();
    form.resetFields();
  };

  const onFinish = () => {
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
            <Select
              allowClear
              size="middle"
              onChange={(value) => onUpdateStatus(value, guid)}
              showSearch
              optionFilterProp="label"
              placeholder="Назначить курьера"
              className={clsx(styles.assign)}
              style={{ width: "100%" }}
              dropdownMatchSelectWidth={false}
              getPopupContainer={(trigger) => trigger.parentNode}
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              //   options={filteredUsers}
            />{" "}
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
