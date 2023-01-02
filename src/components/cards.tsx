import { Repository } from "../lib/github/getRepositoriesMapping";
import { Card, Col, Row, Button, Space, Image } from "antd";

interface Props {
  repositories: Repository[];
  onClick: (name: string) => void;
}

export const ProjectCards = ({ repositories, onClick }: Props): JSX.Element => {
  return (
    <Row justify={"start"} wrap={true} gutter={[32, 32]} style={{maxWidth: "1324px"}}>
      {repositories.map((repo) => (
        <Col
          key="card"
    
        >
          <Card
            title={repo.name}
            bordered={false}
            style={{ width: 400, height: 400 }}
            cover={
              <Image
                width={200}
                height={200}
                src={repo.urlImageSmall}
                alt="error"
                preview={false}
                fallback="/error.png"
              />
            }
          >
            {repo.description}
            <Space direction="vertical" style={{ width: "100%" }}>
              <Button type="primary" block onClick={() => onClick(repo.name)}>
                See more
              </Button>
            </Space>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
