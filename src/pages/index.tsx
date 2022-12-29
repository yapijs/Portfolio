import Head from "next/head";
import styles from "../../styles/Home.module.css";
import React from "react";
import { getContributions, getRepositories } from "../lib/github";
import {
  parseJsonRepository,
  Repository,
} from "../lib/github/getRepositoriesMapping";
import { ProjectCards } from "../components/cards";
import { useRouter } from "next/router";
import reformatWeeks, {
  DataContributions,
  Weeks,
} from "../lib/calendar/calendar";
import MyCalendar from "../components/calendar";
import { Typography, Col, Row, Space } from "antd";

// const style: React.CSSProperties = { background: "#0092ff", padding: "8px 0px" };
const { Title, Text } = Typography;

interface Props {
  username: string;
  avatarUrl: string;
  totalContributions: number;
  dataContributions: DataContributions[];
  repositories: Repository[];
}

export async function getServerSideProps() {
  const rawContributionData = await getContributions("yapijs");
  const rawRepoData = await getRepositories("yapijs");

  const allWeeks: Weeks[] =
    rawContributionData.data.user.contributionsCollection.contributionCalendar
      .weeks;
  const totalContributions =
    rawContributionData.data.user.contributionsCollection.contributionCalendar
      .totalContributions;

  const formattedContributionDays: DataContributions[] =
    reformatWeeks(allWeeks);

  return {
    props: {
      username: rawContributionData.data.user.name,
      avatarUrl: rawContributionData.data.user.avatarUrl,
      dataContributions: formattedContributionDays,
      repositories: parseJsonRepository(rawRepoData),
    },
  };
}

export default function Home(props: Props) {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>Dāvis portfolio</title>
        <meta name="description" content="Next.js app by Dāvis" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Space direction="vertical" align="center" size="large">
          <Row
            className="row"
            justify={"space-between"}
            gutter={[24, { xs: 8, md: 24 }]}
          >
            <Col className="col" flex="auto">
              <div
                className="profile-pic"
                style={{
                  width: 400,
                  height: 400,
                  backgroundImage: `url("/me.png")`,
                  borderRadius: 8,
                  backgroundPositionX: -100,
                  backgroundSize: "cover",
                }}
              ></div>
            </Col>
            <Col className={styles.userData}>
              <div className={styles.userText}>
                <Text className={styles.title}>{props.username}</Text>
                <Text className={styles.description}>
                  Some text describing me
                </Text>
              </div>
              <MyCalendar contributions={props.dataContributions}></MyCalendar>
            </Col>
          </Row>

          <ProjectCards
            repositories={props.repositories}
            onClick={(name) => router.push("/" + name)}
          ></ProjectCards>
        </Space>
      </main>
    </div>
  );
}
