import formatModule from "../moduleFormatter";

describe("formatModule", () => {
  it("returns default value when matching key exists", () => {
    const module = {
      "path/to/key": { default: "value" },
    };
    const result = formatModule(module, "key");
    expect(result).toBe("value");
  });

  it("returns empty string when no matching key exists", () => {
    const module = {
      "path/to/key": { default: "value" },
    };
    const result = formatModule(module, "key2");
    expect(result).toBe("");
  });

  it("returns empty string when module is empty", () => {
    const module = {};
    const result = formatModule(module, "key");
    expect(result).toBe("");
  });

  it("handles empty targetKey", () => {
    const module = {
      "path/to/": { default: "value" },
    };
    const result = formatModule(module, "");
    expect(result).toBe("value");
  });

  it("uses the first match when multiple keys end with the target key", () => {
    const module = {
      "path/to/key": { default: "firstValue" },
      "another/path/to/key": { default: "secondValue" },
    };
    const result = formatModule(module, "key");
    expect(result).toBe("firstValue");
  });
});
