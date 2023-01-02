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
import { Typography, Col, Row, Space, Avatar, Divider } from "antd";

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
        <meta name="portfolio" content="Next.js app by Dāvis" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Space direction="vertical" align="start" size={64}>
          <Row justify={"space-between"} gutter={32}>
            <Col className={styles.avatarCol}>
              <Avatar
                src="/me.png"
                shape="square"
                size={400}
                style={{ borderRadius: "10px" }}
              ></Avatar>
            </Col>
            <Col className={styles.userData}>
              <Space direction="vertical">
                <Space>
                  <Avatar
                    className={styles.avatarInline}
                    src="/me.png"
                    shape="square"
                    size={100}
                    style={{ borderRadius: "10px" }}
                  ></Avatar>
                  <Text className={styles.title}>{props.username}</Text>
                </Space>
                <Text className={styles.description}>
                  Some text describing me
                </Text>
              </Space>
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
