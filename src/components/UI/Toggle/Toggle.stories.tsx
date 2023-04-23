import { Meta, StoryObj } from "@storybook/react";
import ToggleComponent from "./Toggle";

const meta: Meta<typeof ToggleComponent> = {
  title: "Toggle",
  component: ToggleComponent,
  tags: ["autodocs"],
  argTypes: {}
}

export default meta;

type Story = StoryObj<typeof ToggleComponent>;

export const Toggle: Story = {
  args: {
    values: ["ru", "en"],
    activeValue: "ru",
    onClick: () => {}
  }
}

export const ActiveToggle: Story = {
  args: {
    values: ["ru", "en"],
    activeValue: "en",
    onClick: () => {}
  }
}