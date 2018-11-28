import { Tab, Tabs } from '@material-ui/core';
import React, { ChangeEvent, SFC } from 'react';

interface ViewsProps {
  value: number;
  onChange(event: ChangeEvent<{}>, value: any): void;
}

const Views: SFC<ViewsProps> = ({ value, onChange }) => (
  <Tabs value={value} onChange={onChange} fullWidth>
    <Tab label="Events" />
    <Tab label="Friends" />
  </Tabs>
);

export default Views;
