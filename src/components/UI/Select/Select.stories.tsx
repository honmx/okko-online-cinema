import { Meta, StoryObj } from "@storybook/react";
import SelectComponent from "./index";
import { genres } from "../../../helpers/data/genres";
import { capitalize } from "../../../helpers/capitalize";


const meta: Meta<typeof SelectComponent> = {
  title: "Select",
  component: SelectComponent,
  tags: ["autodocs"],
  decorators: [(story) => {

    return <div>
      <p style={{color: "#ffffff"}}>resize the window</p>
      {story()}
    </div>
  }],
  argTypes: {}
}

export default meta;

type Story = StoryObj<typeof SelectComponent>;

export const Select: Story = {
  args: {
    values: genres,
    selectedValue: capitalize(genres[0].title),
    setSelectedValue: (value: string) => {},
    title: "Жанры"
  }
}
