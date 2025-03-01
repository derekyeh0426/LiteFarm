import React from 'react';
import PureDocumentTile from '../../containers/Documents/DocumentTile';
import { componentDecorators } from '../Pages/config/decorators';

export default {
  title: 'Components/DocumentTile',
  component: PureDocumentTile,
  decorators: componentDecorators,
};

const Template = (args) => (
  <div style={{ height: '140px' }}>
    <PureDocumentTile {...args} />
  </div>
);

export const Variety = Template.bind({});
Variety.args = {
  title: 'Document Name I have a very long name, hahaha',
  type: 'Crop Compliance',
  date: "May 01 21'",
  preview: `https://litefarm.nyc3.cdn.digitaloceanspaces.com/default_crop/blueberry.jpg`,
  imageComponent: (props) => <img {...props} />,
};
