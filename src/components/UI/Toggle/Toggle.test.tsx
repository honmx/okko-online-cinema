import { fireEvent, render } from "@testing-library/react";
import Toggle from "./Toggle";

describe("", () => {
  test("component renders", () => {
    const { getByText } = render(
      <Toggle values={["ru", "en"]} activeValue="ru" onClick={() => {}} />
    );

    expect(getByText("ru")).toBeInTheDocument();
  });

  test("toggle can be clicked", () => {

    const fn = jest.fn();

    const { getByRole } = render(
      <Toggle values={["ru", "en"]} activeValue="ru" onClick={fn} />
    );

    const toggle = getByRole("button");

    fireEvent.click(toggle);

    expect(fn).toBeCalled();
  });
})