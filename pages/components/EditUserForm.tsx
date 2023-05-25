import { Button, Dropdown, Form, Input, List, Select } from "antd";
import axios from "axios";
import React, { useEffect } from "react";

interface User {
  id: string | number;
  name: string;
  email: string;
  gender: string;
  address: {
    street: string;
    city: string;
  };
  phone: string;
}

const EditUserForm = ({
  record,
  onCancel,
}: {
  record: User | null;
  onCancel: () => void;
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (record) {
      form.setFieldsValue(record); // Set initial values of the form fields
    }
  }, [record, form]);

  const handleSave = (id: any) => {
    form.validateFields().then((values) => {
      // Handle form submission
      console.log("Edited values:", values);
      axios
        .patch(`http://localhost:3000/api/update/${id}`, values)
        .then((res) => {
          console.log(res);
          onCancel(); // Close the form after submission
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  console.log(record);
  return (
    <Form
      form={form}
      onSubmitCapture={() => {
        handleSave(record?.id);
      }}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input email!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Gender"
        name="gender"
        rules={[{ required: true, message: "Please input gender!" }]}
      >
        <Select>
          <Select.Option value="male">Male</Select.Option>
          <Select.Option value="female">Female</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Street" name="street" initialValue={record?.address.street}>
        <Input />
      </Form.Item>
      <Form.Item label="City" name="city" initialValue={record?.address.city}>
        <Input />
      </Form.Item>
      <Form.Item label="Phone" name="phone">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="default" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditUserForm;
