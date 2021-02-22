import React from 'react';
import decorators from '../../config/decorators';
import PureMapHeader from '../../../../components/Map/Header/';

export default {
  title: 'Components/Map/MapHeader',
  component: PureMapHeader,
};

const Template = (args) => <PureMapHeader {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.parameters = {
  chromatic: { viewports: [320, 414, 768, 1024, 1800] },
};
