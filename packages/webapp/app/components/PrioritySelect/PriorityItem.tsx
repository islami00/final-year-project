import { Combobox } from '@mantine/core';
import * as React from 'react';
import { Priority } from '../../models/Task.model';
import { P } from '../P';
import { PriorityFlag } from './PriorityFlag';
import { PriorityDictionary } from './PrioritySelect.utils';

interface PriorityItemProps {
  priority: Priority;
}
export function PriorityItem(props: PriorityItemProps) {
  const { priority } = props;
  const { color, label } = PriorityDictionary[priority];

  return (
    <Combobox.Option value={priority}>
      <PriorityFlag color={color} />
      <P textStyle="smSemiBold">{label}</P>
    </Combobox.Option>
  );
}
