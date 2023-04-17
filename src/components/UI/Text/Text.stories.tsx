import { Meta, StoryObj } from "@storybook/react";
import TextComponent from "./Text";

const meta: Meta<typeof TextComponent> = {
  title: "Text",
  component: TextComponent,
  tags: ["autodocs"],
  argTypes: {}
}

export default meta;

type Story = StoryObj<typeof TextComponent>;

export const TextWithoutConfig: Story = {
  args: {
    children: "Text",
  }
}

export const TextWithVariant: Story = {
  args: {
    variant: "h1",
    children: "Text",
  }
}

export const TextWithFontSize: Story = {
  args: {
    fs: "50px",
    children: "Text",
  }
}

export const TextWithFontWeight: Story = {
  args: {
    fw: 400,
    children: "Text",
  }
}

export const TextWithColor: Story = {
  args: {
    color: "#ff0",
    children: "Text",
  }
}