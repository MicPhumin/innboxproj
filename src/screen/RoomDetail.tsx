import { ArrowLeftOutlined, UserOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  Card,
  Row,
  Image,
  Typography,
  Col,
  Divider,
  Flex,
  Tag,
  Input,
  Form,
  type FormProps,
  notification,
  Modal,
  Button,
} from "antd";
import "./RoomDetail.css";
import dayjs from "dayjs";
import { SlCalender } from "react-icons/sl";
import { MdDirectionsBike } from "react-icons/md";
import { FiCoffee } from "react-icons/fi";
import { FaTv, FaWifi } from "react-icons/fa";
import { TbAirConditioning, TbIroning } from "react-icons/tb";
import { LuRefrigerator } from "react-icons/lu";
import { IoWaterOutline } from "react-icons/io5";
import { GiCoffeePot } from "react-icons/gi";
import { PiHairDryer } from "react-icons/pi";
import type { Room } from "../type/room";
import QrCodePromptpay from "../component/QrCodePromptpay";
// import "dayjs/locale/th";

// type Props = {};
const { Title } = Typography;
const { TextArea } = Input;
type NotificationType = "success" | "info" | "warning" | "error";

const RoomDetail = () => {
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalText, setModalText] = useState<Room>({});

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  console.log("state", state);
  // const { roomId } = useParams();
  // console.log("state id", roomId);

  // const handleSelectChange = (value: string) => {
  //   console.log(`selected ${value}`);
  // };

  const date1 = dayjs(state.dateCheck ? state.dateCheck[0] : "", "DD/MM/YYYY");
  const result1 = date1.format("DD MMM YYYY");
  const date2 = dayjs(state.dateCheck ? state.dateCheck[1] : "", "DD/MM/YYYY");
  const result2 = date2.format("DD MMM YYYY");
  console.log("date1", date1);

  const onFinish: FormProps<Room>["onFinish"] = (values) => {
    console.log("Success:", values);
    showModal();
    setModalText(values);
  };

  const onFinishFailed: FormProps<Room>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
    openNotificationWithIcon("error", errorInfo);
  };

  const openNotificationWithIcon = (type: NotificationType, err: any) => {
    err.errorFields.map((item: any) => {
      api[type]({
        title: <div style={{ color: "red" }}>บันทึกข้อมูลไม่สำเร็จ</div>,
        description: item.errors[0],
      });
    });
  };
  return (
    <>
      {contextHolder}
      <Modal
        title={<div style={{ fontSize: 18 }}>ยืนยันข้อมูล</div>}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            className="bookingbtn"
            size="large"
            onClick={() => handleOk()}
          >
            ยืนยัน
          </Button>,
        ]}
      >
        <QrCodePromptpay value={modalText} />
      </Modal>
      <div className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <Row>
            <Col md={6} lg={4} xl={3}>
              {" "}
              <button
                className="bookingbtn"
                style={{ width: "100%", marginLeft: "20px" }}
                onClick={() => {
                  navigate("/");
                }}
              >
                <ArrowLeftOutlined style={{ marginRight: 10, fontSize: 16 }} />
                ย้อนกลับ
              </button>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col md={24} lg={16} xl={16}>
              <Card className="roomCard">
                {/* <InnboxLoading /> */}
                <Title level={1} style={{ marginTop: "10px" }}>
                  ห้องหมายเลข {state.roomId} ({state.roomType})
                  <p
                    style={{
                      marginTop: 10,
                      color: "#555",
                      fontSize: "20px",
                    }}
                  >
                    <UserOutlined /> สำหรับผู้ใหญ่ 2 ท่าน (สูงสุด 2 ท่าน)
                  </p>
                </Title>{" "}
                <Row justify={"center"} gutter={[16, 16]}>
                  <Image.PreviewGroup
                    preview={{
                      onChange: (current, prev) =>
                        console.log(
                          `current index: ${current}, prev index: ${prev}`
                        ),
                    }}
                  >
                    <Col>
                      {state.roomType === "ห้องเตียงเดี่ยว" ? (
                        <Image
                          height={200}
                          width={300}
                          src="/src/assets/singleroom.jpg"
                        />
                      ) : (
                        <Image
                          height={200}
                          width={300}
                          src="/src/assets/twinroom.jpg"
                        />
                      )}
                    </Col>
                    <Col>
                      <Image
                        height={200}
                        width={300}
                        src="/src/assets/desk.jpg"
                      />
                    </Col>
                    <Col>
                      <Image
                        height={200}
                        width={300}
                        src="/src/assets/glassbath.jpg"
                      />
                    </Col>
                    <Col>
                      <Image
                        height={200}
                        width={300}
                        src="/src/assets/bathroom.jpg"
                      />
                    </Col>
                    <Col>
                      <Image
                        height={200}
                        width={300}
                        src="/src/assets/bike.jpg"
                      />
                    </Col>
                    <Col>
                      <Image
                        height={200}
                        width={300}
                        src="/src/assets/sheepdoll.jpg"
                      />
                    </Col>
                  </Image.PreviewGroup>
                </Row>
                <Divider
                  titlePlacement="start"
                  style={{ margin: "20px 10px 10px 10px" }}
                >
                  สิ่งอำนวยความสะดวกในห้องพัก
                </Divider>
                <Flex gap="small" wrap align="center">
                  <Tag
                    variant="outlined"
                    style={{
                      fontSize: "14px",
                      color: "#555",
                    }}
                  >
                    <FaTv
                      style={{
                        fontSize: "15px",
                        marginTop: "5px",
                        marginRight: "3px",
                      }}
                    />
                    Smart TV
                  </Tag>
                  <Tag
                    variant="outlined"
                    style={{
                      fontSize: "14px",
                      color: "#555",
                    }}
                  >
                    <TbAirConditioning
                      style={{
                        fontSize: "15px",
                        marginTop: "5px",
                        marginRight: "3px",
                      }}
                    />
                    เครื่องปรับอากาศ
                  </Tag>
                  <Tag
                    variant="outlined"
                    style={{
                      fontSize: "14px",
                      color: "#555",
                    }}
                  >
                    <FaWifi
                      style={{
                        fontSize: "15px",
                        marginTop: "5px",
                        marginRight: "3px",
                      }}
                    />
                    อินเทอร์เน็ตความเร็วสูง (Wi-Fi)
                  </Tag>
                  <Tag
                    variant="outlined"
                    style={{
                      fontSize: "14px",
                      color: "#555",
                    }}
                  >
                    <LuRefrigerator
                      style={{
                        fontSize: "15px",
                        marginTop: "5px",
                        marginRight: "3px",
                      }}
                    />
                    ตู้เย็น
                  </Tag>
                  <Tag
                    variant="outlined"
                    style={{
                      fontSize: "14px",
                      color: "#555",
                    }}
                  >
                    <IoWaterOutline
                      style={{
                        fontSize: "15px",
                        marginTop: "5px",
                        marginRight: "3px",
                      }}
                    />
                    เครื่องทำน้ำอุ่น
                  </Tag>
                  <Tag
                    variant="outlined"
                    style={{
                      fontSize: "14px",
                      color: "#555",
                    }}
                  >
                    {" "}
                    <GiCoffeePot
                      style={{
                        fontSize: "15px",
                        marginTop: "5px",
                        marginRight: "3px",
                      }}
                    />
                    กาต้มน้ำไฟฟ้า
                  </Tag>
                  <Tag
                    variant="outlined"
                    style={{
                      fontSize: "14px",
                      color: "#555",
                    }}
                  >
                    <PiHairDryer
                      style={{
                        fontSize: "15px",
                        marginTop: "5px",
                        marginRight: "3px",
                      }}
                    />
                    ไดร์เป่าผม
                  </Tag>
                  <Tag
                    variant="outlined"
                    style={{
                      fontSize: "14px",
                      color: "#555",
                    }}
                  >
                    <TbIroning
                      style={{
                        fontSize: "15px",
                        marginTop: "5px",
                        marginRight: "3px",
                      }}
                    />
                    เตารีด
                  </Tag>
                </Flex>
                <Divider
                  titlePlacement="start"
                  style={{ margin: "20px 10px 10px 10px" }}
                >
                  บริการเพิ่มเติม
                </Divider>
                <Flex gap="small" wrap align="center">
                  <Tag
                    variant="outlined"
                    style={{
                      fontSize: "14px",
                      color: "#555",
                    }}
                  >
                    {" "}
                    <FiCoffee
                      style={{
                        fontSize: "15px",
                        marginTop: "5px",
                        marginRight: "3px",
                      }}
                    />
                    ชุดเซ็ตมินิบาร์อาหารเช้า
                  </Tag>
                  <Tag
                    variant="outlined"
                    style={{
                      fontSize: "14px",
                      color: "#555",
                    }}
                  >
                    <MdDirectionsBike
                      style={{
                        fontSize: "15px",
                        marginTop: "5px",
                        marginRight: "3px",
                      }}
                    />
                    จักรยานให้บริการสำหรับผู้เข้าพัก
                  </Tag>
                </Flex>
                <Divider
                  titlePlacement="start"
                  style={{ margin: "20px 10px 10px 10px" }}
                >
                  ราคาห้องพัก
                </Divider>
                <Row>
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: "bold",
                      color: "#37A000",
                    }}
                  >
                    THB 550.00
                  </div>
                  <div
                    style={{
                      marginLeft: 5,
                      fontSize: 22,
                      fontWeight: "bold",
                      color: "#555",
                    }}
                  >
                    / คืน
                  </div>
                </Row>
              </Card>
            </Col>
            <Col md={24} lg={8} xl={8}>
              <Card className="roomCard">
                <Title level={3} style={{ marginTop: "10px" }}>
                  รายละเอียดการจอง
                </Title>{" "}
                <Divider></Divider>
                {state.dateCheck &&
                result1 != "Invalid Date" &&
                result2 != "Invalid Date" ? (
                  <>
                    <p style={{ color: "#555", marginRight: "5px" }}>
                      วันที่เข้าพัก (เช็กอิน & เช็กเอาต์)
                    </p>
                    <p style={{ color: "#555", marginRight: "5px" }}>
                      <SlCalender style={{ marginRight: "10px" }} />
                      {result1} - {result2}
                    </p>
                  </>
                ) : (
                  <></>
                )}
                <Form
                  layout={"vertical"}
                  form={form}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Row justify={"start"}>
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
                      style={{ width: "100%" }}
                    >
                      <Input placeholder="ระบุอีเมล" />
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
                      onClick={() => {}}
                      htmlType="submit"
                      style={{ marginTop: "10px" }}
                    >
                      จองเลย
                    </Button>
                  </Row>
                </Form>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default RoomDetail;
