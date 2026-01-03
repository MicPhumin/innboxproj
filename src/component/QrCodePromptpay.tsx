import { QRCodeCanvas } from "qrcode.react";
import PromptPayQR from "promptpay-qr";
import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Image,
  Button,
  Upload,
  type UploadProps,
  Divider,
  message,
} from "antd";
import type { Room } from "../type/room";
import { UploadOutlined } from "@ant-design/icons";
import { uploadQr } from "../../server/api/userApi";

type Props = {
  value: Room;
};

const QrCodePromptpay = (props: Props) => {
  const promptpayId = "0933278454";
  const amount = 550.0;
  // console.log("props.value", props.value);

  const qrValue = PromptPayQR(promptpayId, {
    amount,
  });

  const [image, setImage] = useState(null);
  useEffect(() => {
    console.log("image", image);
    uploadQr(image[0]);
  }, [image]);
  console.log("href", window.location.host);

  const upload: UploadProps = {
    name: "file",
    action: "http://localhost:5000/api/users/uploadImage",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      console.log("info", info);

      uploadQr(info);
      if (info.file.status !== "uploading") {
        console.log("info.file", info.file);
        setImage(info.file);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <>
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
          <Row justify={"center"}>
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
          </Row>
          <Divider />
          <Row justify={"center"}>
            <Col xs={12} sm={12} md={12} lg={12} xl={11}>
              <div style={{ fontSize: 18 }}>อัพโหลดสลิป :</div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={11}>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files)}
              ></input>
              {/* <button type=""></button> */}
              <Upload
                {...upload}
                maxCount={1}
                onChange={(e: any) => setImage(e.target.file)}
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
        </Col>
      </Row>
    </>
  );
};

export default QrCodePromptpay;
