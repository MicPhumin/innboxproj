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
  message,
  type UploadFile,
  type UploadProps,
} from "antd";
import type { Room } from "../type/room";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

type Props = {
  value: Room;
};

const QrCodePromptpay = (props: Props) => {
  const promptpayId = "0933278454";
  const amount = 550.0;

  const qrValue = PromptPayQR(promptpayId, {
    amount,
  });

  const [image, setImage] = useState<UploadFile[]>([]);

  const upload: UploadProps = {
    name: "file",
    customRequest: async ({ file, onSuccess, onError }) => {
      const formData = new FormData();

      const path = window.location.pathname;
      const id = path.split("/").pop();

      formData.append("hostname", window.location.host);
      formData.append("image", file);
      formData.append("id", id);

      const res = await axios.patch(
        `http://localhost:5000/api/users/uploadImage`,
        formData
      );
      if (res.data.status === "done") {
        const uploadFile = file as UploadFile;
        message.success(res.data.status);
        uploadFile.thumbUrl = `${res.data.url}`;
        uploadFile.status = "done";
        onSuccess?.(res.data);
      } else {
        message.error(res.data.status);
        onError?.(res.data);
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
              <Upload
                {...upload}
                maxCount={1}
                listType="picture"
                onChange={({ fileList }) => setImage(fileList)}
                defaultFileList={image}
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
