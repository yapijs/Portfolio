import { GetServerSideProps, NextPage } from "next";
import { Button, Space } from "antd";
import { getRepositoryData } from "../lib/github";
import {
  parseJsonRepository,
  RepositoryData,
} from "../lib/github/getSingleRepositoryMapping";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let rawSingleRepoData;
  if (typeof ctx.query.repoName === "string") {
    // rawSingleRepoData = await getRepositoryData("yapijs", "random");
    rawSingleRepoData = await getRepositoryData("yapijs", ctx.query.repoName);
  }
  const repository: RepositoryData = parseJsonRepository(rawSingleRepoData);

  return { props: { name: ctx.query.repoName } }; //todo: ja repo neeksistē
};

type Props = { name: string };
const Repository = ({ name }: Props): JSX.Element => {
  return (
    <div>
      <Space>
        <Button href="/">Back</Button>

        <Button type="primary">Check project in Github</Button>
      </Space>
    </div>
  );
};

export default Repository;
