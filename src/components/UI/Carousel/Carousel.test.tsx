import { fireEvent, render } from "@testing-library/react";
import Carousel from "./Carousel";
import { movies } from "@/helpers/data/movies";
import Card from "../Card/Card";

describe("", () => {
  test("component renders", () => {
    const { container } = render(
      <Carousel>
        {movies.map(movie => <Card key={movie.id} item={movie} linkHref={movie.title} />)}
      </Carousel>
    );
    
    expect(container.getElementsByClassName("carouselContainer")[0]).toBeInTheDocument();
  });
  
  test("carousel matches snapshot", () => {
    const component = render(
      <Carousel>
        {movies.map(movie => <Card key={movie.id} item={movie} linkHref={movie.title} />)}
      </Carousel>
    );
    
    expect(component).toMatchSnapshot();
  })
})