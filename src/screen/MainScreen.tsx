import {
  Col,
  Image,
  Row,
  DatePicker,
  Select,
  Typography,
  Tabs,
  type TabsProps,
  Button,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./MainScreen.css";
import ShowRoomCard from "../component/ShowRoomCard";
import { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import type { Room } from "../type/room";
import { getUsers } from "../../server/api/userApi.ts";

const { Title } = Typography;
const { RangePicker } = DatePicker;

const MainScreen = () => {
  const [roomData, setRoomData] = useState<Room[]>([]);
  const [date, setDate] = useState<string[]>([]);
  const [roomType, setRoomType] = useState<string>();
  const [tab, setTab] = useState<string>("1");

  const getUserData = async () => {
    await getUsers().then((res: { data: Room[] }) => {
      setRoomData(res.data);
    });
  };

  useEffect(() => {
    getUserData();
  }, []);

  console.log(roomType);

  const onSearch = () => {
    const filter = roomData.filter((item: Room) => {
      return item.roomType === roomType;
    });
    setRoomData(filter);
  };

  // const DeleteUser = async (key: any) => {
  //   console.log("REACT DELETE key:", key);
  //   await deleteUser(key);
  //   setRoomData((prev) => prev.filter((u) => u.roomId !== key));
  // };

  // const addUser = async () => {
  //   await createUser({ roomType: "ห้องเตียงเดี่ยว" });
  // };

  // --------------------Old use Axios---------------------------------------------
  // const getUserData = async () => {
  //     await axios
  //       .get("http://localhost:5000/api/users/")
  //       .then((res) => setRoomData(res.data));
  //   };

  //   const getRoomDataById = async (key: number) => {
  //     await axios
  //       .get(`http://localhost:5000/api/users/${key}`)
  //       .then((res) => console.log("res=ID>>", res.data));
  //   };

  //---------------------------------------------------------------------------------------

  const handleSelectChange = (value: string) => {
    getUserData();
    setRoomType(value);
  };

  const onChange = (key: string) => {
    setTab(key);
    if (key === "2") {
      getUserData();
    }

    if (roomType !== undefined) {
      onSearch();
    }
  };

  const onRangeChange = (
    dates: null | (Dayjs | null)[],
    dateStrings: string[]
  ) => {
    if (dates) {
      const dateCheck = [];
      dateCheck.push(dateStrings[0], dateStrings[1]);
      setDate(dateCheck);
      console.log("dateCheck: ", dateCheck);
    } else {
      console.log("Clear");
    }
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "ค้นหาด้วยวันที่",
      children: (
        <>
          <Row justify={"center"} gutter={16} align={"middle"}>
            <Col md={20} lg={12} xl={9}>
              <Select
                size="large"
                placeholder="กรุณาเลือกประเภทห้องพัก"
                style={{ width: "100%" }}
                onChange={handleSelectChange}
                options={[
                  {
                    value: "ห้องเตียงเดี่ยว",
                    label: "ห้องเตียงเดี่ยว",
                  },
                  { value: "ห้องเตียงคู่", label: "ห้องเตียงคู่" },
                ]}
              />
            </Col>
            <Col md={20} lg={12} xl={9}>
              <RangePicker
                size="large"
                onChange={onRangeChange}
                format="DD/MM/YYYY"
                onBlur={(_, info) => {
                  console.log("Focus:", info.range);
                }}
                style={{ width: "100%" }}
              />
            </Col>
            <Col xs={16} sm={16} md={20} lg={12} xl={6}>
              <Button
                icon={<SearchOutlined style={{ fontSize: 16 }} />}
                iconPlacement="end"
                className="bookingbtn"
                size="large"
                onClick={() => onSearch()}
              >
                ค้นหา
              </Button>
            </Col>
          </Row>
        </>
      ),
    },
    {
      key: "2",
      label: "ค้นหาด้วยห้องพัก",
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
              จองที่พัก INNBOX
            </Title>{" "}
            <Row justify={"center"}>
              <Tabs
                defaultActiveKey="1"
                className="pill-tabs"
                onChange={onChange}
                centered
                items={items}
                style={{ width: "60%" }}
              />{" "}
            </Row>
          </div>
        </Row>
        <Row>
          <Col span={1}></Col>
          <Col span={21}>
            {tab == "1" ? (
              <>
                <ShowRoomCard room={roomData} dateCheck={date} />
              </>
            ) : (
              <>
                <ShowRoomCard room={roomData} />;
              </>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default MainScreen;
