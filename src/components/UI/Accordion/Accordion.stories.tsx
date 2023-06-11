import { Meta, StoryObj } from "@storybook/react";
import AccordionComponent from "./Accordion";
import { footerNavbar } from "../../../helpers/data/footerNavbar";

const meta: Meta<typeof AccordionComponent> = {
  title: "Accordion",
  component: AccordionComponent,
  tags: ["autodocs"],
  argTypes: {

  }
}

export default meta;

type Story = StoryObj<typeof AccordionComponent>;

export const Accordion: Story = {
  args: {
    title: "My accordion",
    children: footerNavbar.map((item: any) => <p key={item.title}>{item.title}</p>)
  }
}