import "./ShowRoomCard.css";
import { Carousel, Col, Row, Image, Rate, Card, Tag, Button } from "antd";

import { UserOutlined } from "@ant-design/icons";
import { FaBed, FaTv } from "react-icons/fa";
import { MdDirectionsBike } from "react-icons/md";
import { FiCoffee } from "react-icons/fi";
import { useNavigate } from "react-router";
import type { Room } from "../type/room";
import { GrDocumentText } from "react-icons/gr";
import InnboxLoading from "./InnboxLoading";

// const onChange = (key: string) => {
//   console.log(key);
// };

type Props = {
  room: Room[];
  dateCheck?: string[];
};

const ShowRoomCard = (props: Props) => {
  const navigate = useNavigate();

  return (
    <>
      {props.room.length <= 0 ? (
        <>
          <Card className="roomCard" style={{ padding: 0 }}>
            <InnboxLoading />
          </Card>
        </>
      ) : (
        <>
          {props.room.map((room: Room) => {
            return (
              <Card className="roomCard" style={{ padding: 0 }}>
                <Row>
                  <Col md={24} lg={8} xl={8}>
                    <Carousel autoplay style={{ borderRadius: 20 }}>
                      <div>
                        {room.roomType == "ห้องเตียงเดี่ยว" ? (
                          <Image
                            height={300}
                            width={400}
                            src="src\assets\singleroom.jpg"
                            style={{ borderRadius: 20 }}
                          />
                        ) : (
                          <Image
                            height={300}
                            width={400}
                            src="src\assets\twinroom.jpg"
                            style={{ borderRadius: 20 }}
                          />
                        )}
                      </div>
                      <div>
                        <Image
                          height={300}
                          width={400}
                          src="src\assets\desk.jpg"
                          style={{ borderRadius: 20 }}
                        />
                      </div>
                      <div>
                        <Image
                          height={300}
                          width={400}
                          src="src\assets\glassbath.jpg"
                          style={{ borderRadius: 20 }}
                        />
                      </div>
                      <div>
                        <Image
                          height={300}
                          width={400}
                          src="src\assets\bathroom.jpg"
                          style={{ borderRadius: 20 }}
                        />
                      </div>
                    </Carousel>
                  </Col>

                  {/* Content */}
                  <Col md={24} lg={10} xl={10} style={{ padding: 16 }}>
                    <h2 style={{ margin: 0 }}>
                      {room.roomType == "ห้องเตียงเดี่ยว"
                        ? `ห้องหมายเลข ${room.roomId} (เตียงเดี่ยว)`
                        : `ห้องหมายเลข ${room.roomId} (เตียงคู่)`}
                    </h2>

                    <Rate disabled defaultValue={5} style={{ fontSize: 16 }} />

                    {/* <div style={{ marginTop: 6 }}>
              <a>
                <EnvironmentOutlined /> Show on map
              </a>
            </div> */}
                    <Row>
                      <Tag
                        color="green"
                        style={{ fontSize: 16, marginTop: 8, marginBottom: 8 }}
                      >
                        โปรโมชั่นและข้อเสนอ / Promos and Offers
                      </Tag>
                    </Row>
                    <Row>
                      <p style={{ marginTop: 5, color: "#555" }}>
                        <FaBed style={{ marginRight: 10 }} />
                        สิ่งอำนวยความสะดวกครบครัน
                      </p>
                    </Row>
                    <Row>
                      <p style={{ marginTop: 5, color: "#555" }}>
                        <FiCoffee style={{ marginRight: 10 }} />
                        Set Minibar อาหารเช้า ฟรี !
                      </p>
                    </Row>
                    <Row>
                      <p style={{ marginTop: 5, color: "#555" }}>
                        <FaTv style={{ marginRight: 10 }} />
                        พักดี มี SmartTV ทุกห้อง
                      </p>
                    </Row>
                    <Row>
                      <p style={{ marginTop: 5, color: "#555" }}>
                        <MdDirectionsBike style={{ marginRight: 10 }} />
                        จักรยานให้บริการฟรี!
                      </p>
                    </Row>
                  </Col>

                  <Col
                    md={24}
                    lg={6}
                    xl={6}
                    style={{
                      borderLeft: "1px solid #f0f0f0",
                      padding: 16,
                      textAlign: "right",
                    }}
                  >
                    <div style={{ textAlign: "right" }}>
                      <Row justify={"end"}>
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
                      <p style={{ marginTop: 10, color: "#555" }}>
                        <UserOutlined /> สำหรับผู้ใหญ่ 2 ท่าน
                      </p>
                      <Button
                        icon={<GrDocumentText style={{ fontSize: 16 }} />}
                        size="large"
                        iconPlacement="end"
                        className="bookingbtn"
                        onClick={() => {
                          navigate(`/RoomDetail/${room.roomId}`, {
                            state: {
                              roomId: room.roomId,
                              roomType: room.roomType,
                              dateCheck: props?.dateCheck,
                            },
                          });
                        }}
                      >
                        เริ่มต้นการจอง
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card>
            );
          })}
        </>
      )}
    </>
  );
};

export default ShowRoomCard;
