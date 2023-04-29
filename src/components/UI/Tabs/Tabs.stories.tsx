import { Meta, StoryObj } from "@storybook/react";
import TabsComponent from "./Tabs";

const meta: Meta<typeof TabsComponent> = {
  title: "Tabs",
  component: TabsComponent,
  tags: ["autodocs"],
  argTypes: {}
}

export default meta;

type Story = StoryObj<typeof TabsComponent>;

export const TabsWithFirstElem: Story = {
  args: {
    tabs: ["Описание", "Варианты просмотра"],
    tabIndex: 0,
    onChange: () => {},
    children: ["aaaa", "bbbbb"],
  }
}

export const TabsWithSecondElem: Story = {
  args: {
    tabs: ["Описание", "Варианты просмотра"],
    tabIndex: 1,
    onChange: () => {},
    children: ["aaaa", "bbbbb"],
  }
}