const helper = require("../libs/helper");

describe("clearDataFromRedis", () => {
  it("should return true for valid url", () => {
    expect(helper.validateUrl("https://www.google.com")).toBe(true);
  });

  it("should return false for invalid url", () => {
    expect(helper.validateUrl("google.com")).toBe(false);
  });
});
