import { GetServerSideProps, NextPage } from "next";
import { Button, Space } from "antd";
import { getRepositoryData } from "../lib/github";
import {
  parseJsonRepository,
  RepositoryData,
} from "../lib/github/getSingleRepositoryMapping";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let rawSingleRepoData;
  let props: Props;

  if (typeof ctx.query.repoName === "string") {
    // rawSingleRepoData = await getRepositoryData("yapijs", "random");
    rawSingleRepoData = await getRepositoryData("yapijs", ctx.query.repoName);
    const repository: RepositoryData = parseJsonRepository(rawSingleRepoData);
    props = {
      name: repository.name,
      readme: repository.readme,
      urlImageSmall: repository.urlImageSmall,
      urlCoverImage: repository.urlCoverImage,
      badges: repository.badges,
    };
  } else {
    props = {};
  }

  return { props }; //todo: ja repo neeksistē
};

type Props = {
  repoExists?: boolean;
  name?: string;
  readme?: string;
  urlImageSmall?: string;
  urlCoverImage?: string;
  badges?: string[];
};

const Repository = ({ name, readme }: Props): JSX.Element => {
  return (
    <div>
    
      <Space>
        <div>{name}</div>
        <div>{readme}</div>

        <Button href="/">Back</Button>
        <Button type="primary">Check project in Github</Button>
      </Space>
    </div>
  );
};

export default Repository;
