import { QRCodeCanvas } from "qrcode.react";
import PromptPayQR from "promptpay-qr";
import React, { useState } from "react";
import {
  Col,
  Row,
  Image,
  Button,
  Upload,
  Divider,
  type UploadFile,
  type UploadProps,
  notification,
} from "antd";
import type { Room } from "../type/room";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { FaCheckSquare } from "react-icons/fa";
import InnboxLoading from "./InnboxLoading";
import { MdError, MdOutlineWarning } from "react-icons/md";
import InnboxQrPromptpay from "/src/assets/InnboxQrPromptpay.jpg";
type Props = {
  value: Room;
  setSuccessBtn: React.Dispatch<React.SetStateAction<boolean>>;
};

type NotificationType = "success" | "info" | "warning" | "error";

const QrCodePromptpay = (props: Props) => {
  // const promptpayId = "0933278454";
  // const amount = 550.0;

  // const qrValue = PromptPayQR(promptpayId, {
  //   amount,
  // });
  const [imageUrl, setImageUrl] = useState("");
  const [checkSlip, setCheckSlip] = useState<string>();
  const [api, contextHolder] = notification.useNotification();

  const handleFileChange = (event: any) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(event.file.originFileObj);
  };

  const openNotificationWithIcon = (type: NotificationType, title: string) => {
    api[type]({
      title: title,
    });
  };
  const upload: UploadProps = {
    name: "file",
    customRequest: async ({ file, onSuccess, onError }) => {
      const path = window.location.pathname;
      const id = path.split("/").pop();
      const formData = new FormData();
      formData.append("files", file);

      // formData.append("hostname", window.location.host);
      // formData.append("id", id);
      setCheckSlip("wait");
      try {
        const response = await axios.post(
          "http://localhost:5000/checkSlip",
          formData,
        );

        console.log("res.data", response.data.data.receiver.displayName);
        const Name = response.data.data.receiver.displayName;
        const OwnerName = Name.includes("กณวรรษ์");

        console.log("OwnerName", OwnerName);
        if (
          response.data.success === true &&
          OwnerName === true &&
          response.data.amout === 550
        ) {
          openNotificationWithIcon("success", "ตรวจสอบสลิปสำเร็จ");
          props.setSuccessBtn(false);
          setCheckSlip("success");
        } else if (response.data.success === true && OwnerName === false) {
          openNotificationWithIcon("warning", "กรุณาอัพโหลดสลิปให้ถูกต้อง");
          setCheckSlip("warning");
        }
      } catch (error) {
        console.error("SlipError:", error);
        openNotificationWithIcon("error", " อัพโหลดสลิปไม่สำเร็จ");
        setCheckSlip("error");
      }

      //===============upload image API==================
      // const res = await axios.patch(
      //   `http://localhost:5000/api/users/uploadImage`,
      //   formData
      // );
      // if (res.data.status === "done") {
      //   const uploadFile = file as UploadFile;
      //   message.success(res.data.status);
      //   uploadFile.thumbUrl = `${res.data.url}`;
      //   uploadFile.status = "done";
      //   onSuccess?.(res.data);
      // } else {
      //   message.error(res.data.status);
      //   onError?.(res.data);
      // }
    },
  };
  return (
    <>
      {contextHolder}
      <Row justify={"center"}>
        <Col xs={24} sm={24} md={24} lg={22} xl={22}>
          <Row justify={"center"}>
            <Col xs={12} sm={12} md={12} lg={12} xl={11}>
              {" "}
              <div style={{ fontSize: 16 }}>ชื่อจริง :</div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={11}>
              {" "}
              <div style={{ fontSize: 16 }}>{props.value.firstName}</div>
            </Col>
          </Row>
          <Row justify={"center"}>
            <Col xs={12} sm={12} md={12} lg={12} xl={11}>
              {" "}
              <div style={{ fontSize: 16 }}>นามสกุล :</div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={11}>
              {" "}
              <div style={{ fontSize: 16 }}>{props.value.lastName}</div>
            </Col>
          </Row>
          <Row justify={"center"}>
            <Col xs={12} sm={12} md={12} lg={12} xl={11}>
              <div style={{ fontSize: 16 }}>เบอร์โทรศัพท์ :</div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={11}>
              <div style={{ fontSize: 16 }}>{props.value.tel}</div>
            </Col>
          </Row>
          <Row justify={"center"}>
            <Col xs={12} sm={12} md={12} lg={12} xl={11}>
              {" "}
              <div style={{ fontSize: 16 }}>อีเมล :</div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={11}>
              {" "}
              <div style={{ fontSize: 16 }}>{props.value.email}</div>
            </Col>
          </Row>
          <Row justify={"center"}>
            <Col xs={12} sm={12} md={12} lg={12} xl={11}>
              {" "}
              <div style={{ fontSize: 16 }}>คำขอพิเศษ :</div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={11}>
              {" "}
              <div style={{ fontSize: 16 }}>
                {props.value.note ? props.value.note : "-"}
              </div>
            </Col>
          </Row>
          {/* <Row justify={"center"}>
            <Image
              height={"auto"}
              width={140}
              src="/src/assets/PromptPayLogo.png"
              preview={false}
            />
          </Row>
          <Row justify={"center"}>
            <div style={{ fontSize: 18 }}>นาย ภูมินทร์ เทียนชัยสิทธิ</div>
          </Row>
          <Row justify={"center"}>
            <QRCodeCanvas value={qrValue} size={150} />
            <Image
              height={"auto"}
              width={140}
              src="/src/assets/InnboxQrPromptpay.jpg"
            />
          </Row> */}
          <Row justify={"center"} style={{ marginTop: 20 }}>
            <Image height={"auto"} width={200} src={InnboxQrPromptpay} />
          </Row>
          <Divider />
          <Row justify={"center"}>
            <Col xs={12} sm={12} md={12} lg={12} xl={11}>
              <div style={{ fontSize: 18 }}>อัพโหลดสลิป :</div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={11}>
              <Upload
                {...upload}
                maxCount={1}
                listType="picture"
                showUploadList={false}
                onChange={handleFileChange}
              >
                <Button
                  icon={<UploadOutlined />}
                  className="bookingbtn"
                  size="large"
                >
                  Click to Upload
                </Button>
              </Upload>
            </Col>
          </Row>
          {checkSlip === "wait" && (
            <>
              {" "}
              <Row justify={"center"} style={{ marginTop: 20 }}>
                <InnboxLoading />
              </Row>
            </>
          )}
          {checkSlip === "error" && (
            <>
              {" "}
              <Row justify={"center"} style={{ marginTop: 20 }}>
                <div style={{ fontSize: 18 }}>
                  อัพโหลดสลิปไม่สำเร็จ
                  <MdError style={{ color: "red", marginLeft: "5" }} />
                </div>
              </Row>
              <Row justify={"center"}>
                <Image
                  width={200}
                  src="error"
                  fallback="data:image/png;base64,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"
                />
              </Row>
            </>
          )}
          {checkSlip === "warning" && (
            <>
              <Row justify={"center"} style={{ marginTop: 20 }}>
                <div style={{ fontSize: 18 }}>
                  กรุณาอัพโหลดสลิปให้ถูกต้อง
                  <MdOutlineWarning
                    style={{ color: "f1c500", marginLeft: "5" }}
                  />
                </div>
              </Row>
              <Row justify={"center"}>
                <Image width={200} src={imageUrl} />
              </Row>
            </>
          )}
          {checkSlip === "success" && (
            <>
              <Row justify={"center"} style={{ marginTop: 20 }}>
                <div style={{ fontSize: 18 }}>
                  ตรวจสอบสลิป สำเร็จ{" "}
                  <FaCheckSquare style={{ color: "green", marginLeft: "5" }} />
                </div>
              </Row>
              <Row justify={"center"}>
                <Image width={200} src={imageUrl} />
              </Row>
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default QrCodePromptpay;
