import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Image } from "antd";

const InnboxLoading = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Image width={100} src="/src/assets/innboxLogo.png" preview={false} />
      <Spin
        indicator={
          <LoadingOutlined spin style={{ fontSize: 48, color: "#f1c500" }} />
        }
        size="large"
      />
    </div>
  );
};

export default InnboxLoading;
