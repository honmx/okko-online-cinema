import { Meta, StoryObj } from "@storybook/react";
import CarouselComponent from "./Carousel";
import Card from "../Card/Card";
import { movies } from "../../../helpers/data/movies";

const meta: Meta<typeof CarouselComponent> = {
  title: "Carousel",
  component: CarouselComponent,
  tags: ["autodocs"],
  argTypes: {}
}

export default meta;

type Story = StoryObj<typeof CarouselComponent>

export const CarouselOfCardsWithoutTitle: Story = {
  args: {
    children: movies.map(movie => <Card key={movie.id} item={movie} linkHref="/" />)
  }
}

export const CarouselOfCardsWithTitle: Story = {
  args: {
    title: "Фильмы",
    linkHref: "/",
    children: movies.map(movie => <Card key={movie.id} item={movie} linkHref="/" />)
  }
}