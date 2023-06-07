import { Meta, StoryObj } from "@storybook/react";
import ModalComponent from "./Modal";


const meta: Meta<typeof ModalComponent> = {
  title: "Modal",
  component: ModalComponent,
  tags: ["autodocs"],
  argTypes: {}
}

export default meta;

type Story = StoryObj<typeof ModalComponent>;

export const Modal: Story = {
  args: {
    onClose: () => {},
    children: <p>some content inside</p>
  }
}