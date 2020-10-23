import React from 'react';
import Checkbox from './';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
};

const Template = (args) => <Checkbox {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "checkbox"
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "disabled",
  disabled: true,
};