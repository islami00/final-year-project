import * as React from 'react';
import { Combobox } from '@mantine/core';
import type { StatusItemData } from './StatusSelect.utils';
import { Icon } from '../Icon';
import { P } from '../P';
import { token } from '@tma/design-system';

interface StatusSelectItemProps {
  status: StatusItemData;
}
export function StatusSelectItem(props: StatusSelectItemProps) {
  const { status } = props;
  return (
    <Combobox.Option value={status.id} key={status.id}>
      <Icon name="IconCircleFilled" color={token(`colors.${status.color}`)} />
      <P textStyle="smSemiBold">{status.name}</P>
    </Combobox.Option>
  );
}
