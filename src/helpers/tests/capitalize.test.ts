import { capitalize } from "../capitalize"

describe("", () => {
  test("empty string", () => {
    const result = capitalize("");

    expect(result).toBe("");
  });

  test("lowercase string", () => {
    const result = capitalize("string");

    expect(result).toBe("String");
  });

  test("uppercase string", () => {
    const result = capitalize("STRING");

    expect(result).toBe("String");
  });
})