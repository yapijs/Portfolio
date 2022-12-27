import Head from "next/head";
import Image from "next/image";
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
        <h1 className={styles.title}>{props.username}</h1>
        <Image src="/me.png" width={420} height={280} alt="" />

        <MyCalendar contributions={props.dataContributions}></MyCalendar>

        <ProjectCards
          repositories={props.repositories}
          onClick={(name) => router.push("/" + name)}
        ></ProjectCards>
      </main>
    </div>
  );
}
