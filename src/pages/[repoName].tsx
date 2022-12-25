import { OmitProps } from "antd/es/transfer/ListBody";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { Context } from "react";
import { Button, Space } from "antd";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
 // console.log(ctx);
  return { props: { name: ctx.query.repoName } }; //todo: ja repo neeksistē
};

type Props = { name: string };
const Repository = ({ name }: Props): JSX.Element => {

  return (
    <div>
      <Space>
        <Button href="/">Back</Button>

        <Button type="primary">
          Check project in Github
        </Button>
      </Space>
    </div>
  );
};

export default Repository;
