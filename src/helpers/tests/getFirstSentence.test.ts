import { getFirstSentence } from "../getFirstSentence"

describe("", () => {
  test("empty string", () => {
    const result = getFirstSentence("");
    
    expect(result).toBe("");
  });

  test("one sentence", () => {
    const result = getFirstSentence("Hello.");
    
    expect(result).toBe("Hello");
  });

  test("few sentences", () => {
    const result = getFirstSentence("Hello. World.");
    
    expect(result).toBe("Hello");
  });
})