import { Meta, StoryObj } from "@storybook/react";
import TrailerCarouselComponent from "./TrailerCarousel";
import { movies } from "../../../helpers/data/movies";

const meta: Meta<typeof TrailerCarouselComponent> = {
  title: "TrailerCarousel",
  component: TrailerCarouselComponent,
  tags: ["autodocs"],
  argTypes: {}
}

export default meta;

type Story = StoryObj<typeof TrailerCarouselComponent>;

export const TrailerCarousel: Story = {

  args: {
    movies: movies
  }
}