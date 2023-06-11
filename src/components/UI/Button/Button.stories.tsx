import { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";
import close from "../../../assets/close.svg";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {

  }
}

export default meta;

type Story = StoryObj<typeof Button>;

export const AccentButton: Story = {
  args: {
    bgColor: "accent",
    children: "Click me"
  }
}

export const PrimaryButton: Story = {
  args: {
    children: "Click me"
  }
}

export const RectangleButtonWithIcon: Story = {
  args: {
    img: close,
    p: "15px"
  }
} 

export const RoundButtonWithIcon: Story = {
  args: {
    img: close,
    shape: "circle",
  }
}

export const RoundButtonWithGivenPadding: Story = {
  args: {
    img: close,
    shape: "circle",
    p: "10px",
  }
}

export const DisabledButton: Story = {
  args: {
    img: close,
    shape: "circle",
    disabled: true
  }
}