import { Meta, StoryObj } from "@storybook/react";
import Card from "./Card";
import { movie } from "../../../helpers/data/data.json";

const meta: Meta<typeof Card> = {
  title: "Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {

  }
}

export default meta;

type Story = StoryObj<typeof Card>;

export const Card16x9: Story = {
  args: {
    item: movie[0],
    linkHref: "/"
  }
}

export const Card1x1: Story = {
  args: {
    item: movie[0],
    linkHref: "/",
    ar: 1
  }
}

export const Card9x16: Story = {
  args: {
    item: movie[0],
    linkHref: "/",
    ar: 0.66
  }
}