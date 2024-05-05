import { Combobox } from '@mantine/core';
import * as React from 'react';
import {
  PriorityItemContentProps,
  PriorityItemContent,
} from './PriorityItemContent';

type PriorityItemProps = PriorityItemContentProps;
export function PriorityItem(props: PriorityItemProps) {
  const { priority } = props;

  return (
    <Combobox.Option value={priority}>
      <PriorityItemContent priority={priority} />
    </Combobox.Option>
  );
}
