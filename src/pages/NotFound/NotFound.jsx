import { Button, Result } from "antd";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Такой страницы не существует."
      extra={
        <Button type="primary">
          <Link to="/">Вернуться на главную</Link>
        </Button>
      }
    />
  );
};
