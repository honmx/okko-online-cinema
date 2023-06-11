import { areFiltersClear } from "../areFiltersClear"

describe("", () => {
  test("empty filters", () => {
    const result = areFiltersClear({
      selectedGenre: "Все",
      selectedCountry: "Все",
      selectedMinRating: 0,
      selectedMinCountOfRating: 0,
      selectedProducer: "",
      selectedActor: "",
      selectedSortBy: "Все"
    });

    expect(result).toBe(true);
  });

  test("some filters applied", () => {
    const result = areFiltersClear({
      selectedGenre: "Драма",
      selectedCountry: "Все",
      selectedMinRating: 6,
      selectedMinCountOfRating: 0,
      selectedProducer: "Гай Ричи",
      selectedActor: "",
      selectedSortBy: "Все"
    });

    expect(result).toBe(false);
  });
})