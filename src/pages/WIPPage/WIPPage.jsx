import { Button, Result } from "antd";
import { Link } from "react-router-dom";

export const WIPPage = () => {
  return (
    <Result
      status="403"
      title="В разработке"
      subTitle="Эта страница ещё в процессе разработки."
      extra={
        <Button type="primary">
          <Link to="/">На главную</Link>
        </Button>
      }
    />
  );
};
