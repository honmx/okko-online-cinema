import { Meta, StoryObj } from "@storybook/react";
import CarouselComponent from "./Carousel";
import { genres } from "../../../helpers/data/genres";
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
    children: genres.map(genre => <Card key={genre.value} item={genre} linkHref="/" />)
  }
}

export const CarouselOfCardsWithTitle: Story = {
  args: {
    title: "Жанры",
    linkHref: "/",
    children: genres.map(genre => <Card key={genre.value} item={genre} linkHref="/" />)
  }
}