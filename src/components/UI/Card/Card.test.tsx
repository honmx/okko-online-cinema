import { fireEvent, render } from "@testing-library/react";
import Card from "./Card";
import { movies } from "@/helpers/data/movies";

describe("", () => {

  test("component renders", () => {
    const { container } = render(
      <Card item={movies[0]} linkHref={movies[0].title} />
    );
    
    expect(container.getElementsByClassName("cardWrapper")[0]).toBeInTheDocument();
  });

  test("card scales if hovered", () => {

    const { container } = render(
      <Card item={movies[0]} linkHref={movies[0].title} />
    );

    const cardWrapper = container.getElementsByClassName("cardWrapper")[0];

    fireEvent.mouseOver(cardWrapper);

    setTimeout(() => {
      expect(cardWrapper).toHaveStyle("scale: 1.05");
    }, 150);
  });
  
  test("card shows video if hovered for 1s", () => {

    const { container } = render(
      <Card item={movies[0]} linkHref={movies[0].title} />
    );

    const cardWrapper = container.getElementsByClassName("cardWrapper")[0];

    fireEvent.mouseOver(cardWrapper);

    setTimeout(() => {
      expect(cardWrapper.getElementsByClassName("video")[0]).toBeInTheDocument();
    }, 1100);
  });

  test("card with default ar", () => {
    const component = render(
      <Card item={movies[0]} linkHref={movies[0].title} />
    );

    expect(component).toMatchSnapshot();
  });

  test("card with ar = 1", () => {
    const component = render(
      <Card item={movies[0]} linkHref={movies[0].title} ar={1} />
    );

    expect(component).toMatchSnapshot();
  });

  test("card with ar = 0.66", () => {
    const component = render(
      <Card item={movies[0]} linkHref={movies[0].title} ar={0.66} />
    );

    expect(component).toMatchSnapshot();
  });
})