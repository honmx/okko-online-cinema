import { Meta, StoryObj } from "@storybook/react";
import InputFieldComponent from "./InputField";


const meta: Meta<typeof InputFieldComponent> = {
  title: "Input Field",
  component: InputFieldComponent,
  tags: ["autodocs"],
  argTypes: {}
}

export default meta;

type Story = StoryObj<typeof InputFieldComponent>;

export const FilledInputField: Story = {
  args: {
    value: "value",
    onChange: (value: string) => {},
    placeholder: "placeholder",
    type: "text",
  }
}

export const TransparentInputField: Story = {
  args: {
    value: "value",
    onChange: (value: string) => {},
    placeholder: "placeholder",
    type: "text",
    appearanceType: "transparent"
  }
}

export const InputFieldWithPlaceholder: Story = {
  args: {
    value: "",
    onChange: (value: string) => {},
    placeholder: "placeholder...",
    type: "text",
  }
}

export const PasswordInputField: Story = {
  args: {
    value: "dfgdf",
    onChange: (value: string) => {},
    placeholder: "placeholder...",
    type: "password",
  }
}