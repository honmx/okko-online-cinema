import { fireEvent, render } from "@testing-library/react";
import Button from "./Button";

describe("", () => {
  test("component renders", () => {
    const { getByText } = render(
      <Button>Click</Button>
    );

    expect(getByText("Click")).toBeInTheDocument();
  });

  test("button can be clicked", () => {
    const fn = jest.fn();
    const { getByText } = render(
      <Button onClick={fn}>Click</Button>
    );

    fireEvent.click(getByText("Click"));
    expect(fn).toBeCalled();
  });

  test("button has appropiate className if the shape is a circle", () => {
    const { container } = render(
      <Button shape="circle">Click</Button>
    );

    expect(container.getElementsByClassName("circle")[0]).toBeInTheDocument();
  })
})