import { getResult } from "../gameResultManager";

describe("gameResultManage", () => {
  describe("getResult", () => {
    it("returns valid results", () => {
      ["victory", "defeat"].forEach((resultName) => {
        const result = getResult(resultName);

        expect(result).toBeDefined();

        expect(result.png).not.toEqual("");
        expect(result.png).toContain(resultName);

        expect(result.webp).not.toEqual("");
        expect(result.webp).toContain(resultName);
      });
    });
  });
});
