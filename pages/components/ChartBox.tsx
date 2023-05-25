import { Button, Form, Input, Modal, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import EditUserForm from "./EditUserForm";
import Fab from "./Fab";

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
const ChartBox = () => {
  const [dataSource, setDataSource] = useState<User[]>([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users");
      setDataSource(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  dataSource.sort((a: User, b: User) => {
    const idA = typeof a.id === "number" ? a.id : parseInt(a.id, 10);
    const idB = typeof b.id === "number" ? b.id : parseInt(b.id, 10);
    return idA - idB;
  });

  console.log(dataSource);

  //Deletes User
  const handleDelete = async (id: string | number) => {
    try {
      await axios
        .delete(`http://localhost:3000/api/delete/${id}`)
        .then((res) => {
          if (res.status === 200) {
            fetchData(); // Fetch data again after successful deletion
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (record: User) => {
    // Handle edit logic here
    console.log("Edit user:", record);
    setSelectedUser(record);
    setEditModalVisible(true); // Show the edit modal
  };

  const handleEditModalClose = () => {
    setEditModalVisible(false); // Hide the edit modal
    fetchData(); // Fetch data again
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
      render: (text: any, record: User) => {
        return (
          <Space>
            <Button
              type="default"
              onClick={() => {
                handleEdit(record);
              }}
            >
              Edit
            </Button>
            <Button
              danger
              type="primary"
              onClick={() => {
                handleDelete(record.id);
              }}
            >
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(user) => user.id}
        pagination={{
          pageSize: 8,
        }}
      />

      <Modal
        title="Edit User"
        open={editModalVisible}
        onCancel={handleEditModalClose}
        footer={null}
      >
        <EditUserForm record = { selectedUser } onCancel = {handleEditModalClose} />
      </Modal>
      <Fab fetchData={fetchData} />
    </>
  );
};

export default ChartBox;
