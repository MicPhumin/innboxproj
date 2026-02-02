import {
  Row,
  Col,
  Typography,
  Image,
  Table,
  type TableProps,
  Checkbox,
  type CheckboxProps,
  Button,
  Form,
  Modal,
  Input,
  InputNumber,
  DatePicker,
  type FormProps,
  notification,
} from "antd";

import React, { useEffect, useState, type SetStateAction } from "react";
import type { Room } from "../type/room";
import TextArea from "antd/es/input/TextArea";
import type { RangePickerProps } from "antd/es/date-picker";
import type { Dayjs } from "dayjs";
import axios from "axios";
import innboxLogowithBG from "../assets/InnboxLogowithBG.jpg";

const { Title } = Typography;
const { RangePicker } = DatePicker;
type NotificationType = "success" | "info" | "warning" | "error";

const AdminScreen = () => {
  const [form] = Form.useForm();
  const [roomData, setRoomData] = useState<Room[]>([]);
  const [date, setDate] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const getUserData = async () => {
    await axios
      .get(
        "https://innboxbackend-e2h0gbh9hxb7gygp.southeastasia-01.azurewebsites.net/rooms",
      )
      .then((res: { data: Room[] }) => {
        setRoomData(res.data);
      });
  };
  useEffect(() => {
    getUserData();
  }, []);
  const openNotificationWithIcon = (type: NotificationType, title: string) => {
    api[type]({
      title: title,
    });
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange: CheckboxProps["onChange"] = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const onRangeChange: RangePickerProps["onChange"] = async (
    dates: null | (Dayjs | null)[],
    dateStrings: string[],
  ) => {
    if (dates) {
      const dateCheck: SetStateAction<string[]> = [];
      dateCheck.push(dateStrings[0], dateStrings[1]);
      setDate(dateCheck);
    } else {
      console.log("Clear");
      setDate([]);
    }
  };

  const onFinish: FormProps<Room>["onFinish"] = async (values) => {
    const userReserve = {
      roomId: values.roomId,
      roomType: values.roomType,
      firstName: values.firstName,
      lastName: values.lastName,
      tel: values.tel,
      email: values.email,
      note: values.note === undefined ? "-" : values.note,
      start_date: date[0],
      end_date: date[1],
      isActive: "true",
    };
    try {
      await axios
        .patch(
          "https://innboxbackend-e2h0gbh9hxb7gygp.southeastasia-01.azurewebsites.net/reserve",
          userReserve,
        )
        .then((res) => {
          console.log("result", res);
          openNotificationWithIcon("success", "เพิ่มข้อมูลสำเร็จ");
        });

      setIsModalOpen(false);
      getUserData();
    } catch (error) {
      console.log("result=>error", error);
      openNotificationWithIcon("error", "เพิ่มข้อมูลไม่สำเร็จ");
    }
  };

  const onFinishFailed: FormProps<Room>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onDelete = async (record: Room) => {
    const userReserve = {
      roomId: record.roomId,
      roomType: record.roomType,
      firstName: "",
      lastName: "",
      tel: "",
      email: "",
      note: "",
      start_date: "",
      end_date: "",
      isActive: "false",
    };

    try {
      await axios
        .patch(
          "https://innboxbackend-e2h0gbh9hxb7gygp.southeastasia-01.azurewebsites.net/reserve",
          userReserve,
        )
        .then((res) => {
          console.log("result", res);
          openNotificationWithIcon("success", "ลบข้อมูลสำเร็จ");
        });

      setIsModalOpen(false);
      getUserData();
    } catch (error) {
      console.log("result=>error", error);
      openNotificationWithIcon("error", "ลบไม่สำเร็จ");
    }
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
      render: (text: string) => (
        <>
          <div>{text === "single" ? "ห้องเตียงเดี่ยว" : "ห้องเตียงคู่"}</div>
        </>
      ),
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
      title: "วันที่เข้า",
      dataIndex: "start_date",
      key: "start_date",
    },
    {
      title: "วันที่ออก",
      dataIndex: "end_date",
      key: "end_date",
    },
    {
      title: "คำขอพิเศษ(หากมี)",
      dataIndex: "note",
      key: "note",
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
        </>
      ),
    },
    {
      title: "",
      dataIndex: "",
      key: "",
      render: (_, record: Room) => (
        <>
          <Button
            className="bookingbtn"
            size="large"
            onClick={() => {
              onDelete(record);
            }}
          >
            ลบข้อมูล
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        {contextHolder}
        <Row>
          <Modal
            title={<div style={{ fontSize: 18 }}>เพิ่มข้อมูล</div>}
            closable={{ "aria-label": "Custom Close Button" }}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={false}
          >
            <Form
              layout={"vertical"}
              form={form}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="หมายเลขห้อง"
                name="roomId"
                rules={[
                  {
                    required: true,
                    message: "กรุณาระบุหมายเลขห้อง",
                  },
                ]}
                style={{ width: "100%" }}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="ระบุหมายเลขห้อง"
                />
              </Form.Item>
              <Form.Item
                label="ชื่อ"
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "กรุณาระบุชื่อ",
                  },
                ]}
                style={{ width: "100%" }}
              >
                <Input placeholder="ระบุชื่่อ" />
              </Form.Item>
              <Form.Item
                label="นามสกุล"
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "กรุณาระบุนามสกุล",
                  },
                ]}
                style={{ width: "100%" }}
              >
                <Input placeholder="ระบุนามสกุล" />
              </Form.Item>
              <Form.Item
                label="หมายเลขโทรศัพท์"
                name="tel"
                rules={[
                  {
                    required: true,
                    message: "กรุณาระบุหมายเลขโทรศัพท์",
                  },
                ]}
                style={{ width: "100%" }}
              >
                <Input placeholder="ระบุหมายเลขโทรศัพท์" />
              </Form.Item>
              <Form.Item
                label="อีเมล"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "กรุณาระบุอีเมล",
                  },
                ]}
                style={{ width: "100%" }}
              >
                <Input placeholder="ระบุอีเมล" />
              </Form.Item>
              <Form.Item
                label="วันที่เข้า-วันที่ออก"
                name="start_date-end_date"
                rules={[
                  {
                    required: true,
                    message: "กรุณาระบุวันที่เข้า-วันที่ออก",
                  },
                ]}
                style={{ width: "100%" }}
              >
                <RangePicker
                  size="large"
                  onChange={onRangeChange}
                  format="DD/MM/YYYY"
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item
                label="คำขอพิเศษ"
                name="note"
                style={{ width: "100%" }}
              >
                <TextArea
                  rows={4}
                  placeholder="ระบุคำขอพิเศษ (หากมี)"
                  maxLength={6}
                />
              </Form.Item>

              <Button
                className="bookingbtn"
                size="large"
                onClick={() => {}}
                htmlType="submit"
              >
                ยืนยันการเพิ่มข้อมูล
              </Button>
            </Form>
          </Modal>
        </Row>
        <Row justify={"center"}>
          <div style={{ width: "100%" }}>
            <Image width={300} src={innboxLogowithBG} preview={false} />
            <Title level={1} style={{ marginTop: "10px", color: "white" }}>
              Admin INNBOX
            </Title>{" "}
            <Row justify={"center"}>
              {" "}
              <Col md={20} lg={12} xl={18}></Col>
              <Col md={20} lg={12} xl={4}>
                <Button
                  className="bookingbtn"
                  size="large"
                  onClick={() => showModal()}
                >
                  เพิ่มข้อมูล
                </Button>
              </Col>
            </Row>
          </div>
        </Row>
        <Row></Row>,
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
