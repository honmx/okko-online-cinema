import { Meta, StoryObj } from "@storybook/react";
import CustomLinkComponent from "./CustomLink";

const meta: Meta<typeof CustomLinkComponent> = {
  title: "CustomLink",
  component: CustomLinkComponent,
  tags: ["autodocs"],
  argTypes: {

  }
}

export default meta;

type Story = StoryObj<typeof CustomLinkComponent>;

export const CustomLink: Story = {
  args: {
    href: "/",
    children: "Link"
  }
}