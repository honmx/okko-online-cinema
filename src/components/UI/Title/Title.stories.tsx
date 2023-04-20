import { Meta, StoryObj } from "@storybook/react";
import TitleComponent from "./Title";

const meta: Meta<typeof TitleComponent> = {
  title: "Title",
  component: TitleComponent,
  tags: ["autodocs"],
  argTypes: {}
}

export default meta;

type Story = StoryObj<typeof TitleComponent>;

export const TitleWithoutConfig: Story = {
  args: {
    children: "Text",
  }
}

export const TitleWithVariant: Story = {
  args: {
    variant: "h1",
    children: "Text",
  }
}

export const TitleWithFontSize: Story = {
  args: {
    fs: "50px",
    children: "Text",
  }
}

export const TitleWithFontWeight: Story = {
  args: {
    fw: 400,
    children: "Text",
  }
}

export const TitleWithColor: Story = {
  args: {
    color: "#ff0",
    children: "Text",
  }
}