import { Meta, StoryObj } from "@storybook/react";
import SelectComponent from "./Select";
import { genres } from "../../../helpers/data/genres";

const meta: Meta<typeof SelectComponent> = {
  title: "Select",
  component: SelectComponent,
  tags: ["autodocs"],
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof SelectComponent>;

export const Select: Story = {

  args: {
    values: genres.map(genre => ({
      value: genre.title,
      text: genre.title,
    })),
    selectedValue: {
      value: "All",
      text: "Все",
    },
    setSelectedValue: (value) => {}
  }
}