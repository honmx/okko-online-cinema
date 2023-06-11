import moviesFilterSlice, { initialState, setSelectedActor, setSelectedCountry, setSelectedGenre, setSelectedMinCountOfRating, setSelectedMinRating, setSelectedProducer, setSelectedSortBy } from "../slices/moviesFilterSlice";

describe("", () => {

  test("setting genre", () => {
    const action = {
      type: setSelectedGenre.type,
      payload: "Драма",
    }

    const result = moviesFilterSlice(initialState, action);

    expect(result).toHaveProperty("selectedGenre", action.payload);
  });

  test("setting country", () => {
    const action = {
      type: setSelectedCountry.type,
      payload: "США",
    }

    const result = moviesFilterSlice(initialState, action);

    expect(result).toHaveProperty("selectedCountry", action.payload);
  });

  test("setting min rating", () => {
    const action = {
      type: setSelectedMinRating.type,
      payload: 5,
    }

    const result = moviesFilterSlice(initialState, action);

    expect(result).toHaveProperty("selectedMinRating", action.payload);
  });

  test("setting min count of rating", () => {
    const action = {
      type: setSelectedMinCountOfRating.type,
      payload: 500000,
    }

    const result = moviesFilterSlice(initialState, action);

    expect(result).toHaveProperty("selectedMinCountOfRating", action.payload);
  });

  test("setting producer", () => {
    const action = {
      type: setSelectedProducer.type,
      payload: "Гай Ричи",
    }

    const result = moviesFilterSlice(initialState, action);

    expect(result).toHaveProperty("selectedProducer", action.payload);
  });

  test("setting actor", () => {
    const action = {
      type: setSelectedActor.type,
      payload: "Леонардо ДиКаприо",
    }

    const result = moviesFilterSlice(initialState, action);

    expect(result).toHaveProperty("selectedActor", action.payload);
  });

  test("setting sortBy", () => {
    const action = {
      type: setSelectedSortBy.type,
      payload: "По рейтингу",
    }

    const result = moviesFilterSlice(initialState, action);

    expect(result).toHaveProperty("selectedSortBy", action.payload);
  });
});