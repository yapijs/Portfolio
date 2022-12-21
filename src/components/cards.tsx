import { Repository } from "./apiDataFormatter";
import { Card, Col, Row } from "antd";

interface Props {
  repositories: Repository[];
}

export const ProjectCards = ({ repositories }: Props) => {
  return (
    <>
      <div className="site-card-wrapper">
        {repositories.map((repo) => (
          <Row key="card" gutter={16}>
            <Col span={8}>
              <Card title={repo.name} bordered={false} style={{ width: 300 }}>
                {repo.description}
              </Card>
            </Col>
          </Row>
        ))}
      </div>
    </>
  );
};
