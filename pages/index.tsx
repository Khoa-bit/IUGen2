import type { GetStaticProps, NextPage } from "next";

interface Props {
  testData: number[];
}

const Home: NextPage<Props> = ({ testData }) => {
  return (
    <>
      <h1 className="text-3xl font-bold underline"> Hello world! </h1>
      <ul>
        {testData.map((data) => (
          <li key={data}>{data}</li>
        ))}
      </ul>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  let testData = [1, 2, 3, 4, 5, 999];

  return {
    props: {
      testData,
    },
  };
};

export default Home;
