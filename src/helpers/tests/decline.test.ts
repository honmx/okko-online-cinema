import { decline } from "../decline";

describe("", () => {
  test("empty string", () => {
    const result = decline("", 0, "masculine", "ru");

    expect(result).toBe("");
  });

  test("english word with count = 1", () => {
    const result = decline("pen", 1, "masculine", "en");

    expect(result).toBe("pen");
  });

  test("english word with count = 2", () => {
    const result = decline("pen", 2, "masculine", "en");

    expect(result).toBe("pens");
  });

  test("russian masculine word with count = 1", () => {
    const result = decline("фильм", 1, "masculine", "ru");

    expect(result).toBe("фильм");
  });

  test("russian masculine word with count = 3", () => {
    const result = decline("фильм", 3, "masculine", "ru");

    expect(result).toBe("фильма");
  });

  test("russian masculine word with count = 5", () => {
    const result = decline("фильм", 5, "masculine", "ru");

    expect(result).toBe("фильмов");
  });

  test("russian masculine word with count = 12", () => {
    const result = decline("фильм", 12, "masculine", "ru");

    expect(result).toBe("фильмов");
  });

  test("russian masculine word with count = 22", () => {
    const result = decline("фильм", 22, "masculine", "ru");

    expect(result).toBe("фильма");
  });

  test("russian masculine word with count = 101", () => {
    const result = decline("фильм", 101, "masculine", "ru");

    expect(result).toBe("фильм");
  });

  test("russian masculine word with count = 103", () => {
    const result = decline("фильм", 103, "masculine", "ru");

    expect(result).toBe("фильма");
  });
})