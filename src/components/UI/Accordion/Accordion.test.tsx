import { fireEvent, render } from "@testing-library/react";
import Accordion from "./Accordion";

describe("", () => {
  test("component renders", () => {
    const { getByText, queryByText } = render(
      <Accordion title="Accordion">
        <p>test1</p>
        <p>test2</p>
        <p>test3</p>
      </Accordion>
    );
    expect(getByText("Accordion")).toBeInTheDocument();
    expect(queryByText("test1")).not.toBeInTheDocument();
  });

  test("clicking shows children", () => {

    const { container, getByText } = render(
      <Accordion title="Accordion">
        <p>test1</p>
        <p>test2</p>
        <p>test3</p>
      </Accordion>
    );

    fireEvent.click(container.getElementsByClassName("accordion")[0]);

    expect(getByText("test1")).toBeInTheDocument();
    expect(getByText("test2")).toBeInTheDocument();
    expect(getByText("test3")).toBeInTheDocument();
  })
})