import { Meta, StoryObj } from "@storybook/react";
import LoadingComponent from "./Loading";


const meta: Meta<typeof LoadingComponent> = {
  title: "Loading",
  component: LoadingComponent,
  tags: ["autodocs"],
  argTypes: {}
}

export default meta;

type Story = StoryObj<typeof LoadingComponent>;

export const Loading: Story = {
  args: {}
}