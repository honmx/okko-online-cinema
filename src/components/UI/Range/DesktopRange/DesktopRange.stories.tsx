import { Meta, StoryObj } from "@storybook/react";
import DesktopRangeComponent from "./DesktopRange";

const meta: Meta<typeof DesktopRangeComponent> = {
  title: "DesktopRange",
  component: DesktopRangeComponent,
  tags: ["autodocs"],
  argTypes: {}
}

export default meta;

type Story = StoryObj<typeof DesktopRangeComponent>;

export const DesktopRange: Story = {
  args: {
    value: 0,
    setValue: () => {},
  }
}