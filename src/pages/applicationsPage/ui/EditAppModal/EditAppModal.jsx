import { useForm } from "antd/es/form/Form";
import {
  useGetUsersQuery,
  useUpdateApplicationMutation,
} from "../../../../store";
import { Checkbox, Flex, Form, Input, Modal, Select, Typography } from "antd";
import styles from "./EditAppModal.module.scss";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

export const EditAppModal = ({ open, onCancel, record }) => {
  const [form] = useForm();
  const [updateClient] = useUpdateApplicationMutation();
  const { data: users } = useGetUsersQuery({});

  const onFinish = (values) => {
    console.log(values.code_sp_courier, "values");

    updateClient({
      guid: record?.guid,
      code_user: record.code_user,
      status: record?.status,
      nameid: values.nameid_ur || values.nameid_fiz,
      phone: values.phone,
      weight: values.weight,
      number_of_seats: values.number_of_seats,
      code_sp_courier: values.code_sp_courier,
      code_sp_type_client: record?.code_sp_type_client,
      delivery_type: record?.delivery_type,
      address_to: values.address_to,
    });
    onCancel();
    form.resetFields();
  };

  const onClose = () => {
    onCancel();
    form.resetFields();
  };

  const findUser = users?.data.find(
    (item) => +item.codeid === +record?.code_sp_courier
  );

  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        guid: record.guid,
        code_user: record.code_user,
        status: record.status,
        nameid_ur: record.code_sp_type_client === 2 && record.nameid,
        nameid_fiz: record.code_sp_type_client === 1 && record.nameid,
        phone: record.phone,
        weight: record.weight,
        number_of_seats: record.number_of_seats,
        code_sp_courier: findUser?.codeid,
        code_sp_type_client: record.code_sp_type_client,
        delivery_type: record.delivery_type,
        address_to: record.address_to,
      });
    }
  }, [record, form, open, findUser]);

  const filteredUsers = useMemo(() => {
    return users?.data
      .filter((item) => item.code_sp_user_position === 2)
      .map((item) => ({
        label: item.nameid,
        value: item.codeid,
      }));
  }, [users]);

  return (
    <Modal centered open={open} onCancel={onClose} footer={false} width={400}>
      <Typography.Title level={4}>Редактировать заявку</Typography.Title>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        {+record?.code_sp_type_client === 2 && (
          <Form.Item
            name="nameid_ur"
            label="Наименование"
            rules={[
              {
                required: true,
                message: "Это обязательное поле для заполнения!",
              },
            ]}
          >
            <Input placeholder="Введите наименование" />
          </Form.Item>
        )}
        {+record?.code_sp_type_client === 1 && (
          <Form.Item
            name="nameid_fiz"
            label="ФИО"
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
        <Flex gap="small" align="center" justify="space-between">
          <Form.Item label="Тип" name="delivery_type">
            {record?.delivery_type === 1 && (
              <span>
                <b>Документы:</b>
              </span>
            )}
            {record?.delivery_type === 2 && (
              <span>
                <b>Посылка:</b>
              </span>
            )}
          </Form.Item>

          <Form.Item
            label="Вес"
            name="weight"
            rules={[
              {
                required: true,
                message: "Это обязательное поле для заполнения!",
              },
            ]}
          >
            <Input placeholder="Введите вес закза" style={{ width: "120px" }} />
          </Form.Item>
          <Form.Item
            label="Места"
            name="number_of_seats"
            rules={[
              {
                required: true,
                message: "Это обязательное поле для заполнения!",
              },
            ]}
          >
            <Input
              placeholder="Введите кол-во мест"
              style={{ width: "120px" }}
            />
          </Form.Item>
        </Flex>
        <Form.Item
          name="address_to"
          label="Куда"
          rules={[
            {
              required: true,
              message: "Это обязательное поле для заполнения!",
            },
          ]}
        >
          <Input placeholder="Введите адрес" />
        </Form.Item>

        <Form.Item
          label="Курьер"
          name="code_sp_courier"
          rules={[
            {
              required: true,
              message: "Это обязательное поле для заполнения!",
            },
          ]}
        >
          <Select
            allowClear
            showSearch
            placeholder="Выберите курьера"
            style={{ width: "100%" }}
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={filteredUsers}

            // onChange={(value) => setCourierId(value)}
          />
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
