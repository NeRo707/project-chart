import { Button, FloatButton, Form, Input, Modal, Select } from "antd";
import axios from "axios";
import React, { useState } from "react";
import Router from "next/router";
const Fab = () => {
  const [formOpen, setFormOpen] = useState(false);
  
  const router = Router;

const addUser = async (user: any) => {
  try {
    await axios.post("/api/adduser", user).then((res) => {
      console.log(res);
      router.push(router.asPath);
    });
  } catch (err) {
    console.log(err);
  }
  
  setFormOpen(false);
};

  return (
    <>
      {!formOpen ? (
        <FloatButton
          icon="+"
          type="primary"
          onClick={() => setFormOpen(true)}
          className="fixed bottom-5 left-5"
        />
      ) : (
        <>
          <Modal
            title="Edit User"
            open={formOpen}
            onCancel={() => setFormOpen(false)}
            footer={null}
          >
            <Form layout="vertical" onFinish={addUser}>
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
                rules={[{ required: true, message: "Please select gender!" }]}
              >
                <Select>
                  <Select.Option value="male">Male</Select.Option>
                  <Select.Option value="female">Female</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Street" name="street">
                <Input />
              </Form.Item>
              <Form.Item label="City" name="city">
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
          </Modal>
        </>
      )}
    </>
  );
};

export default Fab;
