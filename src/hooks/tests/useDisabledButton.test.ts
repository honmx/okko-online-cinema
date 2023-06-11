import { renderHook } from "@testing-library/react"
import { useDisabledButton } from "../useDisabledButton"

describe("", () => {
  test("incorrect email", () => {
    const { result } = renderHook(() => useDisabledButton("a"));

    expect(result.current[0]).toBe(true);
  });

  test("incorrect email 2", () => {
    const { result } = renderHook(() => useDisabledButton("a@"));

    expect(result.current[0]).toBe(true);
  });

  test("corrent email", () => {
    const { result } = renderHook(() => useDisabledButton("abcde@mail.ru"));

    expect(result.current[0]).toBe(false);
  });
})