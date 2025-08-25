import { Flex, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import styles from "./WarningModal.module.scss";
import clsx from "clsx";

export const WarningModal = ({ title, open, onCancel, onConfirm }) => {
  const onClose = () => {
    onCancel();
  };

  const onFinish = () => {
    onConfirm();
    onCancel();
  };

  return (
    <Modal centered open={open} onCancel={onClose} footer={false} width={350}>
      <Flex vertical align="center" className={clsx("mb-4 gap-4")}>
        <ExclamationCircleOutlined className={clsx(styles.icon)} />
        <span className={clsx("text-ьв font-bold")}>
          Вы действительно хотите {title}?
        </span>
      </Flex>

      <Flex vertical>
        <button
          type="submit"
          className={clsx(styles.confirm)}
          onClick={onFinish}
        >
          Подтвердить
        </button>
      </Flex>
    </Modal>
  );
};
