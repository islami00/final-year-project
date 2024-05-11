import * as React from 'react';
import { Priority } from '../../models/Task.model';
import { P } from '../P';
import { PriorityFlag } from './PriorityFlag';
import { PriorityDictionary } from './PrioritySelect.utils';

export interface PriorityItemContentProps {
  priority: Priority;
}
export function PriorityItemContent(props: PriorityItemContentProps) {
  const { priority } = props;
  const { color, label } = PriorityDictionary[priority];

  return (
    <>
      <PriorityFlag color={color} />
      <P textStyle="smSemiBold">{label}</P>
    </>
  );
}
