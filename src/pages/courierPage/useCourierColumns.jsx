import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import { Flex, Tooltip } from "antd";
import styles from "./CourierPage.module.scss";
import clsx from "clsx";
import { FaRegTrashAlt } from "react-icons/fa";

export const useCourierColumns = ({ onUpdate, onOpenWarnModal }) => {
  const columns = [
    {
      key: "guid",
      dataIndex: "guid",
      title: "№",
      align: "center",
      width: 30,
      render: (_, __, index) => {
        return index + 1;
      },
    },
    {
      key: "nameid",
      dataIndex: "nameid",
      title: "ФИО",
    },
    {
      key: "phone",
      dataIndex: "phone",
      title: "Телефон",
    },
    {
      key: "login",
      dataIndex: "login",
      title: "Логин",
    },
    {
      key: "password",
      dataIndex: "password",
      title: "Пароль",
    },
    {
      key: "id",
      dataIndex: "id",
      title: "...",
      width: 80,
      align: "center",
      render: (_, record) => (
        <Flex gap="middle" className={clsx(styles.actions)}>
          <Tooltip title="Редактировать заказ">
            <EditOutlined
              onClick={() => onUpdate(record.codeid)}
              className={clsx("text-blue-600 cursor-pointer")}
            />
          </Tooltip>

          <Tooltip title="Удалить заказ">
            <FaRegTrashAlt
              onClick={() => onOpenWarnModal(record.codeid)}
              className={clsx("text-red-600 cursor-pointer")}
            />
          </Tooltip>
        </Flex>
      ),
    },
  ];

  return { columns };
};
