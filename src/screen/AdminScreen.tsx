import {
  Row,
  Col,
  Typography,
  Image,
  Table,
  type TableProps,
  Checkbox,
  type CheckboxProps,
} from "antd";

import React, { useEffect, useState } from "react";
import type { Room } from "../type/room";
import { getUsers } from "../../server/api/userApi";

const { Title } = Typography;

const AdminScreen = () => {
  const [roomData, setRoomData] = useState<Room[]>([]);
  const getUserData = async () => {
    await getUsers().then((res: { data: Room[] }) => {
      console.log("res===>", res.data);
      setRoomData(res.data);
    });
  };
  useEffect(() => {
    getUserData();
  }, []);

  const onChange: CheckboxProps["onChange"] = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  const columns: TableProps<Room>["columns"] = [
    {
      title: "หมายเลขห้อง",
      dataIndex: "roomId",
      key: "roomId",
    },
    {
      title: "ประเภทห้อง",
      dataIndex: "roomType",
      key: "roomType",
    },
    {
      title: "ชื่อจริง",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "นามสกุล",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "เบอร์โทรศัพท์",
      dataIndex: "tel",
      key: "tel",
    },
    {
      title: "อีเมล",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "วันที่เข้า-วันที่ออก",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "คำขอพิเศษ(หากมี)",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "สถานะห้องพัก",
      dataIndex: "qrImage",
      key: "qrImage",
      render: (_, { qrImage }) => (
        <>
          {qrImage ? (
            <Image
              width={100}
              alt="basic"
              src={`http://localhost:5000${qrImage}`}
            />
          ) : (
            <>No Image</>
          )}
        </>
      ),
    },
    {
      title: "สถานะห้องพัก",
      dataIndex: "isActive",
      key: "isActive",
      render: (_, { isActive }) => (
        <>
          <Checkbox
            onChange={onChange}
            checked={isActive === "true" ? true : false}
          ></Checkbox>
          ,
        </>
      ),
    },
  ];

  return (
    <div className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <Row justify={"center"}>
          <div style={{ width: "100%" }}>
            <Image
              width={300}
              src="src\assets\innboxLogowithBG.jpg"
              preview={false}
            />
            <Title level={1} style={{ marginTop: "10px", color: "white" }}>
              Admin INNBOX
            </Title>{" "}
            <Row justify={"center"}></Row>
          </div>
        </Row>
        <Row>
          <Col span={1}></Col>
          <Col span={22}>
            <Table<Room> columns={columns} dataSource={roomData} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AdminScreen;
