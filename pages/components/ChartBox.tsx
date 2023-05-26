import { Button, Modal, Space, Table } from "antd";
import { useState } from "react";
import axios from "axios";
import EditUserForm from "./EditUserForm";
import { IUser } from "@/store/types/IUser";
import { useRouter } from "next/router";

const ChartBox = ({ data }: { data: IUser[] }) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  
  const router = useRouter();

  const handleDelete = async (id: any) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/delete/${id}`);
      console.log(res);
      router.push(router.asPath);
    } catch (err) {
      console.log(err);
    }
  };


  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Address",
      dataIndex: ["address", "street"],
      render: (text: any, record: { address: { city: any } }) =>
        `${text}, ${record.address.city}`,
      key: "address",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: IUser) => (
        <Space size="middle">
          <Button onClick={() => {setEditModalVisible(true); setSelectedUser(record)}}>Edit</Button>
          <Button danger type="primary" onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        dataSource={data}
        columns={columns}
        rowKey={(user) => user.id}
        pagination={{
          pageSize: 8,
        }}
      />

      <Modal
        title="Edit User"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
      >
        <EditUserForm record = { selectedUser } onCancel = {() => {setEditModalVisible(false); router.push(router.asPath)}} />
      </Modal>
      
    </>
  );
};

export default ChartBox;
