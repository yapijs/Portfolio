import { Repository } from "./apiDataFormatter";
import { Card, Col, Row, Button, Space } from "antd";

interface Props {
  repositories: Repository[];
  onClick: (name: string) => void;
}

export const ProjectCards = ({ repositories, onClick }: Props): JSX.Element => {
  return (
    <>
      <div className="site-card-wrapper">
        {repositories.map((repo) => (
          <Row key="card" gutter={16}>
            <Col span={8}>
              <Card title={repo.name} bordered={false} style={{ width: 300 }}>
                {repo.description}
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Button
                    type="primary"
                    block
                    onClick={() => onClick(repo.name)}
                  >
                    See more
                  </Button>
                </Space>
              </Card>
            </Col>
          </Row>
        ))}
      </div>
    </>
  );
};
