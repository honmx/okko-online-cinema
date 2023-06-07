import { Meta, StoryObj } from "@storybook/react";
import Card from "./Card";
import { movies } from "../../../helpers/data/movies";
import { genres } from "../../../helpers/data/genres";

const meta: Meta<typeof Card> = {
  title: "Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {

  }
}

export default meta;

type Story = StoryObj<typeof Card>;

export const MovieCard16x9: Story = {
  args: {
    item: movies[0],
    linkHref: "/"
  }
}

export const MovieCard1x1: Story = {
  args: {
    item: movies[0],
    linkHref: "/",
    ar: 1
  }
}

export const MovieCard9x16: Story = {
  args: {
    item: movies[0],
    linkHref: "/",
    ar: 0.66
  }
}

export const GenreCard1x1: Story = {
  args: {
    item: genres[0],
    linkHref: "/",
    ar: 1
  }
}