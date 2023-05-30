export const decline = (word: string, count: number, type: "masculine" | "feminine") => {
  if (count % 100 >= 12 && count % 100 <= 14) {
    return type === "masculine" ? word + "ов" : word.slice(0, -2) + "ок";
  } else if (count % 10 >= 2 && count % 10 <= 4) {
    return type === "masculine" ? word + "а" : word.slice(0, -1) + "и";
  } else if (count % 10 === 1) {
    return word;
  } else {
    return type === "masculine" ? word + "ов" : word.slice(0, -2) + "ок";
  }
}