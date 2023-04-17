import { Meta, StoryObj } from "@storybook/react";
import IconButtonComponent from "./IconButton";
import Image from "next/image";
import search from "../../../assets/search_icon.svg";

const meta: Meta<typeof IconButtonComponent> = {
  title: "IconButton",
  component: IconButtonComponent,
  tags: ["autodocs"],
  argTypes: {}
}

export default meta;

type Story = StoryObj<typeof IconButtonComponent>;

export const IconButton: Story = {
  args: {
    children: <Image src={search} alt="search" />
  }
}