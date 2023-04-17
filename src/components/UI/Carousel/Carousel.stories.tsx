import { Meta, StoryObj } from "@storybook/react";
import CarouselComponent from "./Carousel";
import { movie } from "../../../helpers/data/data.json";
import Card from "../Card/Card";

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
    children: movie.map(movie => <Card key={movie.id} item={movie} linkHref="/" />)
  }
}

export const CarouselOfCardsWithTitle: Story = {
  args: {
    title: "Жанры",
    linkHref: "/",
    children: movie.map(movie => <Card key={movie.id} item={movie} linkHref="/" />)
  }
}