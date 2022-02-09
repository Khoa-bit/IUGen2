import type { GetStaticProps, NextPage } from "next";

interface Props {
  testData: number[];
}

const PermutationPage: NextPage<Props> = ({ testData }) => {
  let dataArray = [
    [1, 2, 3],
    [1, 2],
    [1, 2],
  ];

  let prefix: number[] = [];

  let result = permuteGroup({ dataGroup: dataArray, prefix });
  console.log(result);

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

interface permutationArgs {
  dataGroup: number[][];
  prefix: number[];
}

export function permuteGroup({ dataGroup, prefix }: permutationArgs) {
  if (dataGroup.length == 0) {
    return [prefix];
  } else {
    let result: number[][] = [];
    for (let data of dataGroup[0]) {
      let childResult = permuteGroup({
        dataGroup: dataGroup.slice(1),
        prefix: [...prefix, data],
      });
      result.push(...childResult);
    }
    return result;
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  let testData = [1, 2, 3, 4, 5, 999];

  return {
    props: {
      testData,
    },
  };
};

export default PermutationPage;
