import React, { useState } from "react";
import Select, { IList } from "../components/Select";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "Components/Select",
  component: Select,
  argTypes: {
    setSelected: { action: "setSelected" },
  },
} as Meta;

const Template: StoryFn = (args) => {
  const [selectedList, setSelectedList] = useState<IList[]>(args.selectedList || []);

  const list = [
    { name: "Bulbasaur", url: "/bulbasaur" },
    { name: "Charmander", url: "/charmander" },
    { name: "Squirtle", url: "/squirtle" },
    { name: "Pikachu", url: "/pikachu" },
    { name: "Eevee", url: "/eevee" },
    { name: "Jigglypuff", url: "/jigglypuff" },
    { name: "Meowth", url: "/meowth" },
  ];

  return (
    <Select
      {...args} 
      list={list}
      selectedList={selectedList}
      setSelected={setSelectedList}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};

export const WithSelectedItems = Template.bind({});
WithSelectedItems.args = {
  selectedList: [
    { name: "Pikachu", url: "/pikachu" },
    { name: "Charmander", url: "/charmander" },
  ],
};

export const MaxSelection = Template.bind({});
MaxSelection.args = {
  selectedList: [
    { name: "Bulbasaur", url: "/bulbasaur" },
    { name: "Charmander", url: "/charmander" },
    { name: "Squirtle", url: "/squirtle" },
    { name: "Pikachu", url: "/pikachu" },
  ],
};
