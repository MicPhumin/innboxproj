import {
  Col,
  Image,
  Row,
  DatePicker,
  Select,
  Typography,
  Tabs,
  type TabsProps,
} from "antd";
import "./MainScreen.css";
import ShowRoomCard from "../component/ShowRoomCard";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState, type SetStateAction } from "react";
import type { Room } from "../type/room";
import { getUsers } from "../../server/api/userApi.ts";
import type { RangePickerProps } from "antd/es/date-picker/index";

const { Title } = Typography;
const { RangePicker } = DatePicker;

const MainScreen = () => {
  const [roomData, setRoomData] = useState<Room[]>([]);
  const [date, setDate] = useState<string[]>([]);
  const [dateShow, setDateShow] = useState<RangePickerProps["value"]>(null);
  const [roomType, setRoomType] = useState<string>("");
  const [tab, setTab] = useState<string>("1");

  const getAllUserData = async () => {
    await getUsers().then((res: { data: Room[] }) => {
      const data = res.data.filter((item: Room) => {
        return item.isActive === "false";
      });
      setRoomData(data);
    });
  };

  // const onSearch = async () => {
  //   if (date !== null && roomType) {
  //     console.log("room type only");
  //     const filterWithDate = roomData.filter((item: Room) => {
  //       return item.roomType === roomType;
  //     });

  //     setRoomData(filterWithDate);
  //   } else if (date !== null && roomType === undefined) {
  //     console.log("date only");
  //     const newData = await getUsers().then((res: { data: Room[] }) => {
  //       const data = res.data.filter((item: Room) => {
  //         return item.isActive === "false";
  //       });
  //       return data;
  //     });
  //     setRoomData(newData);
  //     const filterIsActive = newData.filter((item: Room) => {
  //       return item.isActive === "false";
  //     });
  //     const filterWithDate = filterIsActive.filter((item: Room) => {
  //       return item.date !== date?.join();
  //     });

  //     setRoomData(filterWithDate);
  //   }

  //   if (roomType && date !== null) {
  //     console.log("roomtype,date");
  //     const filterWithDate = roomData.filter((item: Room) => {
  //       return item.date !== date?.join();
  //     });
  //     const filterWithRoomtype = filterWithDate.filter((item: Room) => {
  //       return item.roomType === roomType;
  //     });
  //     setRoomData(filterWithRoomtype);
  //   }
  // };

  useEffect(() => {
    getAllUserData();
  }, []);

  const handleSelectChange = async (value: string) => {
    setRoomType(value);

    const newData = await getUsers().then((res: { data: Room[] }) => {
      const data = res.data.filter((item: Room) => {
        return item.isActive === "false" && item.roomType === value;
      });
      return data;
    });

    setRoomData(newData);

    if (date.length !== 0) {
      const filterWithRoomtype = newData.filter((item: Room) => {
        return item.roomType === value;
      });
      const filterWithDate = filterWithRoomtype.filter((item: Room) => {
        return item.date !== date?.join();
      });

      setRoomData(filterWithDate);
    }
  };

  const onChange = (key: string) => {
    setTab(key);

    if (key === "2") {
      getAllUserData();
    } else {
      console.log("change tab");
      getAllUserData();
      setRoomType("");
      setDate([]);
      setDateShow(null);
    }

    // if (roomType !== undefined) {
    //   console.log("change tab");
    //   onSearch();
    // }
  };

  const onRangeChange: RangePickerProps["onChange"] = async (
    dates: null | (Dayjs | null)[],
    dateStrings: string[]
  ) => {
    if (dates) {
      const dateCheck: SetStateAction<string[]> = [];
      dateCheck.push(dateStrings[0], dateStrings[1]);
      setDate(dateCheck);
      console.log("roomType", roomType);
      if (dateCheck.length !== 0 && roomType === "") {
        console.log("date only");
        console.log("roomData", roomData);
        const newData = await getUsers().then((res: { data: Room[] }) => {
          const data = res.data.filter((item: Room) => {
            return item.isActive === "false";
          });
          return data;
        });

        const filterWithDate = newData.filter((item: Room) => {
          return item.date !== dateCheck.join();
        });

        setRoomData(filterWithDate);
      } else if (roomType && dateCheck.length !== 0) {
        console.log("roomtype,date");
        const newData = await getUsers().then((res: { data: Room[] }) => {
          const data = res.data.filter((item: Room) => {
            return item.isActive === "false";
          });
          return data;
        });
        const filterWithDate = newData.filter((item: Room) => {
          return item.date !== dateCheck.join();
        });
        const filterWithRoomtype = filterWithDate.filter((item: Room) => {
          return item.roomType === roomType;
        });
        setRoomData(filterWithRoomtype);
      }
    } else {
      console.log("Clear");
      setDate([]);
      setDateShow(null);
      const newData = await getUsers().then((res: { data: Room[] }) => {
        const data = res.data.filter((item: Room) => {
          return item.isActive === "false";
        });
        return data;
      });

      if (roomType) {
        console.log("roomType only with clear");
        const filter = newData.filter((item: Room) => {
          return item.roomType === roomType;
        });
        setRoomData(filter);
      }
    }
  };
  const dateFormat = "DD/MM/YYYY";

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "ค้นหาด้วยวันที่",
      children: (
        <>
          <Row justify={"center"} gutter={16} align={"middle"}>
            <Col md={20} lg={12} xl={12}>
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
                defaultValue={roomType ? roomType : undefined}
              />
            </Col>
            <Col md={20} lg={12} xl={12}>
              <RangePicker
                size="large"
                onChange={onRangeChange}
                format="DD/MM/YYYY"
                style={{ width: "100%" }}
                defaultValue={
                  dateShow
                    ? [dayjs(date[0], dateFormat), dayjs(date[1], dateFormat)]
                    : [null, null]
                }
              />
            </Col>
            {/* <Col xs={16} sm={16} md={20} lg={12} xl={6}>
              <Button
                icon={<SearchOutlined style={{ fontSize: 16 }} />}
                iconPlacement="end"
                className="bookingbtn"
                size="large"
                onClick={() => onSearch()}
              >
                ค้นหา
              </Button>
            </Col> */}
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
