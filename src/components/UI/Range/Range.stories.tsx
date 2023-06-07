import { Meta, StoryObj } from "@storybook/react";
import RangeComponent from "./index";


const meta: Meta<typeof RangeComponent> = {
  title: "Range",
  component: RangeComponent,
  tags: ["autodocs"],
  decorators: [(story) => {
    return <div>
      <p style={{ color: "#ffffff" }}>resize the window</p>
      {story()}
    </div>
  }],
  argTypes: {}
}

export default meta;

type Story = StoryObj<typeof RangeComponent>;

export const RangeWithZeroValue: Story = {

  args: {
    value: 0,
    setValue: () => { },
    title: "some title"
  }
}

export const RangeWithNotZeroValue: Story = {
  args: {
    value: 10,
    setValue: () => { },
    title: "some title"
  }
}