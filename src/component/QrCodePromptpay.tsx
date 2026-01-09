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
import { FaCheckSquare } from "react-icons/fa";
import InnboxLoading from "./InnboxLoading";

type Props = {
  value: Room;
  setSuccessBtn: React.Dispatch<React.SetStateAction<boolean>>;
};

const QrCodePromptpay = (props: Props) => {
  const promptpayId = "0933278454";
  const amount = 550.0;

  const qrValue = PromptPayQR(promptpayId, {
    amount,
  });

  const [image, setImage] = useState<UploadFile[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [checkSlip, setCheckSlip] = useState<string>();

  const handleFileChange = (event: any) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(event.file.originFileObj);
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
          formData
        );
        const OwnerName = response.data.receiver.displayName === "กญวรรษน์";
        if (
          response.data.success === true &&
          OwnerName === true &&
          response.data.amout === 550
        ) {
          message.success("Slip Check success");
          props.setSuccessBtn(false);
          setCheckSlip("success");
        } else {
          message.error("Slip Check Failed");
        }
      } catch (error) {
        console.error("Error:", error);
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
            <Image
              height={"auto"}
              width={200}
              src="/src/assets/InnboxQrPromptpay.jpg"
            />
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
          {checkSlip === "wait" && (
            <>
              {" "}
              <Row justify={"center"} style={{ marginTop: 20 }}>
                <InnboxLoading />
              </Row>
            </>
          )}
          {checkSlip === "success" && (
            <>
              <Row justify={"center"} style={{ marginTop: 20 }}>
                <div style={{ fontSize: 18 }}>
                  ตรวจสอบสลิป สำเร็จ{" "}
                  <FaCheckSquare style={{ color: "green" }} />
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
