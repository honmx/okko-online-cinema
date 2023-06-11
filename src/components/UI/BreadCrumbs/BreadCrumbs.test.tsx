import { render } from "@testing-library/react";
import BreadCrumbs from "./BreadCrumbs";
import { renderWithRedux } from "@/helpers/renderWithRedux";

describe("", () => {
  test("component renders", () => {
    const { getByText } = render(renderWithRedux(
      <BreadCrumbs values={[
        { value: "Главная", href: "/" },
        { value: "Фильмы", href: "/movies" }
      ]} />
    ));
    
    expect(getByText("Главная")).toBeInTheDocument();
    expect(getByText("Фильмы")).toBeInTheDocument();
  })
})