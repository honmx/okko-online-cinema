import { Meta, StoryObj } from "@storybook/react";
import TextButton from "./TextButton";

const meta: Meta<typeof TextButton> = {
  title: "TextButton",
  component: TextButton,
  tags: ["autodocs"],
  argTypes: {}
}

export default meta;

type Story = StoryObj<typeof TextButton>;

export const TextButtonUsual: Story = {
  args: {
    children: "button"
  }
}