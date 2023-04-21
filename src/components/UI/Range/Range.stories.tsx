import { Meta, StoryObj } from "@storybook/react";
import RangeComponent from "./Range";

const meta: Meta<typeof RangeComponent> = {
  title: "Range",
  component: RangeComponent,
  tags: ["autodocs"],
  argTypes: {}
}

export default meta;

type Story = StoryObj<typeof RangeComponent>;

export const Range: Story = {
  args: {
    value: 0,
    setValue: () => {},
  }
}