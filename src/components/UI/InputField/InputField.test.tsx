import { fireEvent, render } from "@testing-library/react";
import InputField from "./InputField";

describe("", () => {
  test("component renders", () => {
    const { getByRole } = render(<InputField type="text" placeholder="..." value="" onChange={() => {}} />);
    const input = getByRole("textbox");

    expect(input).toBeInTheDocument();
  });

  test("input placeholder", () => {
    const { getByRole } = render(<InputField type="text" placeholder="some placeholder" value="" onChange={() => {}} />);
    const input = getByRole("textbox");

    expect(input).toHaveProperty("placeholder", "some placeholder");
  });

  test("input type", () => {
    const { getByRole } = render(<InputField type="text" placeholder="some placeholder" value="" onChange={() => {}} />);
    const input = getByRole("textbox");

    expect(input).toHaveProperty("type", "text");
  });

  test("input onchange", () => {
    const fn = jest.fn();
    const { getByRole } = render(<InputField type="text" placeholder="some placeholder" value="" onChange={fn} />);
    const input = getByRole("textbox");

    fireEvent.change(input, {
      target: { value: "a" }
    });

    fireEvent.change(input, {
      target: { value: "aa" }
    });

    expect(fn).toBeCalledTimes(2);
  });
})