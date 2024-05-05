import { token } from '@tma/design-system';
import { Icon } from '../Icon';
import { P } from '../P';
import type { StatusItemData } from './StatusSelect.utils';

export interface StatusSelectItemContentProps {
  status: StatusItemData;
}
export function StatusSelectItemContent(props: StatusSelectItemContentProps) {
  const { status } = props;
  return (
    <>
      <Icon name="IconCircleFilled" color={token(`colors.${status.color}`)} />
      <P textStyle="smSemiBold">{status.label}</P>
    </>
  );
}
