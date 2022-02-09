import { permuteGroup } from "../../pages/compute/permuteGroup";

describe("Group permutation function", () => {
  it("should return an array of all possible group permutations", function () {
    let dataArray = [
      [1, 2, 3],
      [1, 2],
    ];

    let prefix: number[] = [];

    let result = permuteGroup({ dataGroup: dataArray, prefix });

    expect(result).toStrictEqual([
      [1, 1],
      [1, 2],
      [2, 1],
      [2, 2],
      [3, 1],
      [3, 2],
    ]);
  });
});
