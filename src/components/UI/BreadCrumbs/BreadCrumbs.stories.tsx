import { Meta, StoryObj } from "@storybook/react";
import BreadCrumbsComponent from "./BreadCrumbs";
import { moviesPageBreadCrumbs } from "../../../helpers/data/breadCrumbs";
import { Provider } from "react-redux";
import { store } from "../../../store/store";

const meta: Meta<typeof BreadCrumbsComponent> = {
  title: "BreadCrumbs",
  component: BreadCrumbsComponent,
  tags: ["autodocs"],
  decorators: [(story) => <Provider store={store}>
    {story()}
  </Provider>],
  argTypes: {}
}

export default meta;

type Story = StoryObj<typeof BreadCrumbsComponent>;

export const BreadCrumbs: Story = {
  args: {
    values: moviesPageBreadCrumbs
  }
}